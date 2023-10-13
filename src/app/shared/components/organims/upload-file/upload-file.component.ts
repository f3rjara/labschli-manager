import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressFileComponent } from '../../molecules/progress-file/progress-file.component';
import { DndDirective } from '@app/shared/directives/dnd.directive';
import { IconUploadComponent } from '../../atoms/icon-upload/icon-upload.component';
import { IconFileComponent } from '../../atoms/icon-file/icon-file.component';
import { IconDeleteComponent } from '../../atoms/icon-delete/icon-delete.component';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    DndDirective,
    CommonModule,
    ProgressFileComponent,
    IconUploadComponent,
    IconFileComponent,
    IconDeleteComponent,
  ],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(InputFile: any) {
    const files = InputFile.files;
    if (files.length === 0) {
      return;
    }
    this.prepareFilesList(files);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      console.log(item);
      console.log(item.name);
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            console.log(this.files);
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 25;
          }
        }, 250);
      }
    }, 100);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    console.log(index);
    this.files.splice(index, 1);
    console.log(this.files);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes = 0, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
