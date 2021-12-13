import { toast } from "react-toastify";
import api from "../Util/api";

export const deleteHandler = (id, reloader, url) => {
  window['Swal'].fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      api().delete(`api/${url}/${id}`).then(response => {
        toast.success(response.data.message);
        reloader(prev => ({...prev}));
      });
    }
  })
}