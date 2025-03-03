import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/admin/viewusers")
      .then((res) => {
        console.log(res.data.users);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleVerificationToggle = (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    axios
      .post("http://localhost:9000/admin/updateVerification", { userId, status: newStatus })
      .then((res) => {
        alert(res.data.message);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, verification: newStatus } : user
          )
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", marginTop: 3 }}>
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
        Users List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>OTP</b></TableCell>
            <TableCell><b>Verification</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.otp}</TableCell>
                <TableCell>{user.verification || "Inactive"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.verification === "Active" ? "success" : "error"}
                    onClick={() => handleVerificationToggle(user._id, user.verification || "Inactive")}
                  >
                    {user.verification === "Active" ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No Users Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
