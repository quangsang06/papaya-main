import { Box, Button, CircularProgress, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "models";
import { InputField } from "components/TextField";
import Modal from "components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "hooks/useModal";
import { toast } from "react-toastify";
import { getUserById, updateUser } from "services/api";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Field is required"),
  username: yup.string().required("Field is required"),
  email: yup.string().required("Field is required"),
});
const EditPost = () => {
  const navigate = useNavigate();
  const { modalOpen, openModal, closeModal } = useModal();
  const { id } = useParams();

  useEffect(() => {
    fetchUserById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const initialValues: IUser = {
    name: "",
    username: "",
    email: "",
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IUser>({
    defaultValues: initialValues,
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const fetchUserById = async () => {
    const data = await getUserById(Number(id));
    reset({
      username: data?.username,
      name: data?.name,
      email: data?.email,
    });
    return data;
  };
  const handleSubmitForm = async (formValues: IUser) => {
    try {
      const payload: IUser = {
        name: formValues.name,
        username: formValues.username,
        email: formValues.email,
      };
      await updateUser(Number(id), payload);
      toast.success("Save success");
      navigate("/");
    } catch (e) {
      toast.error("Error!");
    }
  };
  return (
    <Container maxWidth={false}>
      <Grid>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <InputField name="name" control={control} label=" Name:" />
          <InputField name="username" control={control} label="User name:" />
          <InputField name="email" control={control} label="Email:" />
          <Grid item xs={12}>
            <Box textAlign="center" sx={{ py: 2 }}>
              <Button
                style={{ marginRight: "0.5em", width: "100px" }}
                type="submit"
                size="small"
                color="primary"
                variant="contained"
              >
                {isSubmitting && <CircularProgress size={16} color="primary" />}
                Lưu
              </Button>
              <Button
                size="small"
                onClick={() => openModal()}
                style={{ width: "100px" }}
                color="inherit"
                variant="contained"
              >
                Huỷ
              </Button>
            </Box>
          </Grid>
        </form>
      </Grid>
      <Modal
        open={modalOpen}
        handleConfirm={() => {
          navigate("/");
        }}
        handleClose={closeModal}
        title="Do you want to cancel?"
      />
    </Container>
  );
};

export default EditPost;
