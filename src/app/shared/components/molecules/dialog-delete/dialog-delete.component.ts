import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/* angular material */
import {MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FilesService } from '@app/core/services/files/files.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})


export class DialogDeleteComponent {

  private _filesService = inject(FilesService);
  private _snackBar = inject(MatSnackBar);

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {}
  idFileToDelete:number = 0;



  deleteFile(){
    console.log("borrar arc", this.idFileToDelete);
    if (this.idFileToDelete == 0) {
      this.idFileToDelete = 0;
      return;
    }
    this._filesService.removeFileToUser(this.idFileToDelete).subscribe({
      next:(response)=>{
        if (response.error) {
          this._snackBar.open('Hubo un problema al eliminar el archivo', 'cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          return;
        }
        this._snackBar.open('Se eliminó con éxito', 'cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error:(error)=>{
        console.error(error);
      },
    })
  }

}
