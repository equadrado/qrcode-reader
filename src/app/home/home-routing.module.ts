import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ImagePickerComponent } from './image-picker/image-picker.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'pick',
    component: ImagePickerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
