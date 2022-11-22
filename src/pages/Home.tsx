import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CustomTable, { IColumn } from "components/Table";
import { PermissionActionBase } from "config/constants";
import { IUsers } from "models";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, fetchAllData } from "services/api";
import { Add } from "@mui/icons-material";
import Modal from "components/Modal";
import { useModal } from "hooks/useModal";

const columns: Array<IColumn<IUsers>> = [
  { label: "Name", key: "name" },
  { label: "User name", key: "username" },
  { label: "Email", key: "email" },
];
const Home = () => {
  const [list, setList] = useState([]);
  const rowId = useRef<Number>();
  const rowName = useRef<String>("");
  const { modalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetchAllData();
    setList(data);
  };

  const handleDelete = async () => {
    await deleteUser(Number(rowId.current));
    closeModal();
    fetchData();
  };
  return (
    <Container maxWidth={false}>
      <div style={{ textAlign: "right", margin: "10px auto" }}>
        <Link to="create" style={{ textDecoration: "none" }}>
          <Button variant="contained" size="small" startIcon={<Add />}>
            Add New User
          </Button>
        </Link>
      </div>
      <Paper elevation={8}>
        <CustomTable
          columns={columns}
          data={list}
          action={[PermissionActionBase.EDIT, PermissionActionBase.DELETE]}
          onClickEdit={(row) => navigate(`edit/${row.id}`)}
          onClickDelete={(row) => {
            rowId.current = row?.id;
            rowName.current = row?.name;
            openModal();
          }}
        />
      </Paper>
      <Modal
        open={modalOpen}
        handleConfirm={() => {
          handleDelete();
        }}
        handleClose={closeModal}
        title={`"Do you want to delete user ${rowName.current}?"`}
      />
    </Container>
  );
};

export default Home;
