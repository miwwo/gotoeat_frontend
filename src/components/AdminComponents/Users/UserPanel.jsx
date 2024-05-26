// components/UserPanel.js
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import UserForm from './UserForm';
import RecipePanel from './RecipePanel';
import { listUsers,updateUser, banUser } from '../../../sevices/UserService';
import { useSelector } from "react-redux";
import Pagination from "../../../pages/Pagination";

const UserPanel = () => {
    const { token } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);

    const [searchQuery, setSearchQuery] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isRecipePanelOpen, setIsRecipePanelOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await listUsers(token);
            setUsers(data);
        };
        fetchUsers();
    }, [token]);
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const lastRecipeIndex = currentPage * usersPerPage;
    const firstRecipeIndex = lastRecipeIndex - usersPerPage;
    const currentUsers = filteredUsers.slice(firstRecipeIndex, lastRecipeIndex);


    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleBanClick = async (id) => {
        await banUser(token, id);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    const handleSubmit = async (user) => {
        if (user.id) {
            const updatedUser = await updateUser(token, user);
            setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
        }
        setIsFormOpen(false);
    };

    const handleClose = () => {
        setIsFormOpen(false);
    };

    const handleViewRecipes = (user) => {
        setSelectedUser(user);
        setIsRecipePanelOpen(true);
    };

    const handleBackToUsers = () => {
        setIsRecipePanelOpen(false);
        setSelectedUser(null);
    };

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleEditClick(user)}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => handleBanClick(user.id)}>
                                    Бан
                                </Button>
                                <Button variant="contained" color="default" onClick={() => handleViewRecipes(user)}>
                                    View Recipes
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isFormOpen} onClose={handleClose}>
                <DialogTitle>{'Edit User'}</DialogTitle>
                <DialogContent>
                    <UserForm
                        user={selectedUser}
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                    />
                </DialogContent>
            </Dialog>
            <Dialog open={isRecipePanelOpen} onClose={handleBackToUsers}>
                <DialogTitle>User Recipes</DialogTitle>
                <DialogContent>
                    {selectedUser && <RecipePanel userId={selectedUser.id} handleBack={handleBackToUsers} />}
                </DialogContent>
            </Dialog>
            <Pagination totalRecord={filteredUsers.length}
                        recordPerPage={usersPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}/>
        </div>
    );
};

export default UserPanel;
