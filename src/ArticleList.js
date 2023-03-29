import { useState } from "react";
import ArticleListDialog from "./ArticleListDialog";
import ArticleListGrid from "./ArticleListGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { AddCircle } from "@mui/icons-material";

const rows = [
  { id: 1, title: "Test" },
  { id: 2, title: "Test2" },
  { id: 3, title: "Test3" }
];

// initial input fields
const initialInputFields = [
  {
    id: "startdate",
    label: "Start",
    type: "date",
    value: new Date().toISOString().substr(0, 10)
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    value: ""
  }
];

export default function ArticleList(props) {
  const [selectedItem, setSelectedItem] = useState({ inputFields: [] });
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns = [
    {
      field: "id",
      headerName: "ID"
    },
    {
      field: "title",
      headerName: "Title"
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<AddCircle />}
          label="Add Article"
          onClick={(e) => {
            e.stopPropagation();
            handleDialogOpen(e);
          }}
        />
      ]
    }
  ];

  const handleDialogOpen = (e) => {
    // merge with custom fields
    const exampleCustomFields = [
      {
        id: "domain",
        label: "Domain",
        type: "domain",
        value: ""
      }
    ];
    const fields = [...initialInputFields, ...exampleCustomFields];

    setSelectedItem({ inputFields: fields });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (e) => {
    console.log(e);
    setDialogOpen(false);
  };

  return (
    <div style={{ display: "flex", height: "100%", minHeight: "500px" }}>
      <ArticleListGrid rows={rows} columns={columns} />
      <ArticleListDialog
        open={dialogOpen}
        inputFields={selectedItem.inputFields}
        handleClose={handleDialogClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
