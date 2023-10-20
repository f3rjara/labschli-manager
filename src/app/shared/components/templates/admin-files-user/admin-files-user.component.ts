import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Column, TableDataComponent } from '../../molecules/table-data/table-data.component';
import { FilesService } from '@app/core/services/files/files.service';
import { IFiles } from '@app/core/models/users/files.model';
import { formatBytes } from '@app/shared/helpers/format-bytes.helper';
import { IActionEvent } from '@app/shared/interfaces/event-action.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../molecules/dialog-delete/dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadderComponent } from '../../molecules/loadder/loadder.component';

@Component({
  selector: 'app-admin-files-user',
  standalone: true,
  imports: [CommonModule, TableDataComponent, MatDialogModule, MatSnackBarModule, LoadderComponent],
  providers: [DatePipe],
  templateUrl: './admin-files-user.component.html',
  styleUrls: ['./admin-files-user.component.scss']
})
export class AdminFilesUserComponent implements OnInit {

  @Input() userId: string | null = null;

  @Input() set uploaderEvent( counter: number ) {
    this._counterFilesAdd += counter;
    this.getFilesUser();
  }

  isLoadderShow: boolean = false;

  private _counterFilesAdd: number = 0;

  private _dialog = inject(MatDialog);

  private _filesService = inject(FilesService);

  private _datePipe = inject(DatePipe);

  private _snackBar = inject(MatSnackBar);

  columnsFilesUser: Column[] = [
    {
      columnDef: 'id',
      header: '#'
    },
    {
      columnDef: 'name',
      header: 'Nombre de archivo'
    },
    {
      columnDef: 'extention',
      header: 'Extensión del archivo',
    },
    {
      columnDef: 'size',
      header: 'Tamaño',
    },
    {
      columnDef: 'created_at',
      header: 'Creado el',
    },
    {
      columnDef: 'adminMail',
      header: 'Asignado por',
    },
    {
      columnDef: 'delete',
      header: 'Eliminar',
      isLink: true,
      icon: 'delete',
    }
  ];

  dataFilesUser: any[] = [];

  ngOnInit(): void {
    this.getFilesUser();
  }

  getFilesUser() {
    if(this.userId) {
      this._filesService.getFilesAdminUser(this.userId).subscribe({
        next: (response) => {
          if(response.error) {
            console.error('Hubo un error al obtener los archivos del usuario');
            return;
          }
          this.dataFilesUser = this.mapFilesUser(response.files.original.files);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  mapFilesUser(files: IFiles[]) {
    return files.map((file) => {
      return {
        id: file.id,
        name: file.nameFile,
        extention: file.extFile.toUpperCase(),
        size: formatBytes(file.sizeFile, 2),
        created_at: this._datePipe.transform(file.created_at, 'dd - MMMM - yyyy'),
        adminMail: file.adminMail,
        delete: file.id
      }
    });
  }

  eventActionSelect(objectEmited: IActionEvent) {
    const { action, row, column  } = objectEmited;
    let dialogoRef = this._dialog.open( DialogComponent, {
      width: '250px',
      data: {
        title: "Eliminar Archivo",
        message: "Esta seguro en eliminar el archivo?"
      }
    });
    dialogoRef.afterClosed().subscribe(dialogResult => {
      if(action == 'delete' && action == column.columnDef && dialogResult ) {
        this.deleteFile(row[action])
      }
   });
  }

  deleteFile( idFile: number = 0) {
    if (idFile == 0) {return; }
    this.isLoadderShow = true;
    this._filesService.removeFileToUser(idFile).subscribe({
      next: (response) => {
        if (response.error) {
          this._snackBar.open('Hubo un problema al eliminar el archivo', 'cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.isLoadderShow = false;
          return;
        }
        this._snackBar.open('El archivo se eliminó con éxito', 'cerrar', {
          duration: 8000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.getFilesUser();
        this.isLoadderShow = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoadderShow = false;
      },
      complete:() => {
        this.isLoadderShow = false;
      }
    });

  }

}
