import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Precipitation } from "src/app/models/precipitation";

export interface PrecipitationsTableItem {
  id: string;
  date: Date;
  millimeters: number;
}

@Component({
  selector: "app-precipitations-table",
  templateUrl: "./precipitations-table.component.html",
  styleUrls: ["./precipitations-table.component.scss"]
})
export class PrecipitationsTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PrecipitationsTableItem>;

  @Input() precipitations: Precipitation[];
  @Output("delete") onDeletePrecipitation = new EventEmitter<string>();

  dataSource = new MatTableDataSource<PrecipitationsTableItem>();
  accumulatedPrecipitations = 0;
  isReady = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["date", "millimeters", "actions"];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.precipitations?.currentValue?.length) {
      const precipitations: Precipitation[] =
        changes.precipitations.currentValue;

      this.dataSource.data = precipitations;

      this.accumulatedPrecipitations = precipitations.reduce(
        (acc, val) => val.millimeters + acc,
        0
      );

      this.isReady = true;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async handleDeletePrecipitationClick(precipitationId: string) {
    const result = confirm(
      "Are you sure you want to delete this precipitation"
    );

    if (result) {
      this.onDeletePrecipitation.emit(precipitationId);
    }
  }
}
