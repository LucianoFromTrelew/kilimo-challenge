import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Farm } from "src/app/models/farm";

export interface FarmsTableItem {
  id: string;
  name: string;
  acres: number;
  accumulatedPrecipitations: number;
}

@Component({
  selector: "app-farms-table",
  templateUrl: "./farms-table.component.html",
  styleUrls: ["./farms-table.component.scss"]
})
export class FarmsTableComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<FarmsTableItem>;

  @Input() farms: Farm[];

  dataSource: MatTableDataSource<FarmsTableItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["name", "acres", "accumulatedPrecipitations"];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.farms?.currentValue?.length) {
      this.dataSource = new MatTableDataSource(changes.farms.currentValue);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
