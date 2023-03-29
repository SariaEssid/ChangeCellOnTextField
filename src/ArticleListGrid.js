import { DataGrid } from "@mui/x-data-grid";

export default function ArticleListGrid(props) {
  return (
    <div style={{ flexGrow: 1 }}>
      <DataGrid rows={props.rows} columns={props.columns} />
    </div>
  );
}
