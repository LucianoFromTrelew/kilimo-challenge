import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FarmsDetailComponent } from "./pages/farms-detail/farms-detail.component";
import { FarmsEditComponent } from "./pages/farms-edit/farms-edit.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  {
    path: "farms",
    redirectTo: "farms/map",
    pathMatch: "full"
  },
  {
    path: "farms",
    children: [
      {
        path: "map",
        component: HomeComponent
      },
      {
        path: "table",
        component: HomeComponent
      },
      { path: "new", component: FarmsEditComponent },
      {
        path: ":id",
        component: FarmsDetailComponent
      },
      {
        path: ":id/edit",
        component: FarmsEditComponent
      }
    ]
  },
  { path: "", redirectTo: "farms/map", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
