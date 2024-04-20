import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "react-query";

import useFormState from "./useFormState";

import PageSpinner from "../UI/PageSpinner";
import BookableForm from "./BookableForm";
import { deleteItem, editItem, getData } from "../../utils/api";

export default function BookableEdit() {
  const { id } = useParams();
  const { data, isLoading } = useBookable(id);
  const formState = useFormState(data);

  const {
    mutate: updateMutate,
    isLoading: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateBookable();
  const {
    mutate: deleteMutate,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteBookable();

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete the bookable?")) {
      // call the mutation function for deleting the bookable
      deleteMutate(formState.state);
    }
  }

  function handleSubmit() {
    // call the mutation function for updating the bookable
    updateMutate(formState.state);
  }

  if (isUpdateError || isDeleteError) {
    return <p>{updateError?.message || deleteError.message}</p>;
  }

  if (isLoading || isUpdating || isDeleting) {
    return <PageSpinner />;
  }

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  );
}

function useDeleteBookable() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation(
    (bookable) => deleteItem(`http://localhost:3001/bookables/${bookable.id}`),
    {
      /* on success receives the original item as a second argument */
      onSuccess: (response, bookable) => {
        // get all the bookables from the cache
        const bookables = queryClient.getQueryData("bookables") || [];

        // set the bookables cache without the deleted one
        queryClient.setQueryData(
          "bookables",
          bookables.filter((b) => b.id !== bookable.id)
        );

        // If there are other bookables in the same group as the deleted one,
        // navigate to the first
        navigate(
          `/bookables/${getIdForFirstInGroup(bookables, bookable) || ""}`
        );
      },
    }
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
  };
}

function useUpdateBookable() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation(
    (item) => editItem(`http://localhost:3001/bookables/${item.id}`, item),
    {
      onSuccess: (bookable) => {
        // replace the pre-edited version in the "bookables" cache
        // with the edited bookable
        updateBookablesCache(bookable, queryClient);

        // do the same for the individual "bookable" cache
        queryClient.setQueryData(["bookable", String(bookable.id)], bookable);

        // show the updated bookable
        navigate(`/bookables/${bookable.id}`);
      },
    }
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
  };
}

function updateBookablesCache(bookable, queryClient) {
  // get all the bookables from the cache
  const bookables = queryClient.getQueryData("bookables") || [];

  // find the index in the cache of the bookable that's been edited
  const bookableIndex = bookables.findIndex((b) => b.id === bookable.id);

  // if found, replace the pre-edited version with the edited one
  if (bookableIndex !== -1) {
    bookables[bookableIndex] = bookable;
    queryClient.setQueryData("bookables", bookables);
  }
}

function useBookable(id) {
  const queryClient = useQueryClient();
  return useQuery(
    ["bookable", id],
    () => getData(`http://localhost:3001/bookables/${id}`),
    {
      // refetching causes problems after deleting a bookable
      refetchOnWindowFocus: false,

      initialData: queryClient
        .getQueryData("bookables")
        ?.find((b) => b.id === parseInt(id, 10)),
    }
  );
}

function getIdForFirstInGroup(bookables, excludedBookable) {
  // get the id and group of the deleted bookable
  const { id, group } = excludedBookable;

  // find the first other bookable in the same group as the deleted one
  const bookableInGroup = bookables.find(
    (b) => b.group === group && b.id !== id
  );

  // return its id or undefined
  return bookableInGroup?.id;
}
