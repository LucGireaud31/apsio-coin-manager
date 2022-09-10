import { useNavigate } from 'react-router';
import { StudentType } from './../../classes.types';
import Swal from "sweetalert2";
import { colors } from "../../style/colors";
import { handleDelete } from "../Classe/handleUserActions";
import { calling } from '../Call/calling';

export function alertDeleteClass(address: string, className: string) {
  const primary = colors.primary[500];
  const gray = colors.gray[500];

  Swal.fire({
    title: `Etes-vous sûr de supprimer ${className} ?`,
    text: "Vous ne pourrez pas revenir en arrière",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: primary,
    cancelButtonColor: gray,
    confirmButtonText: "Oui",
    cancelButtonText: "Annuler",
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(address, className);
    }
  });
}
export async function alertCallingClass(absents:number) {
  const primary = colors.primary[500];
  const gray = colors.gray[500];

  return Swal.fire({
    title: `Etes-vous sûr de mettre absent ${absents} élève${absents>1 ? "s" : ""} ?`,
    text: "Vous ne pourrez pas revenir en arrière",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: primary,
    cancelButtonColor: gray,
    confirmButtonText: "Oui",
    cancelButtonText: "Annuler",
  })
}
