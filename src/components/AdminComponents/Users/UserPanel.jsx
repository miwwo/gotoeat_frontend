// components/UserPanel.js
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import UserForm from './UserForm';
import RecipePanel from './RecipePanel';
import { listUsers, updateUser, banUser } from '../../../sevices/UserService';
import { useSelector } from "react-redux";
import Pagination from "../../../pages/Pagination";
import './UserPanel.css'; // Импортируем файл стилей

const UserPanel = () => {
    const { token } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);

    const [searchQuery, setSearchQuery] = useState("");
    const [reloading, setReloading] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isRecipePanelOpen, setIsRecipePanelOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await listUsers(token);
            setUsers(data);
            setReloading(false)
        };
        fetchUsers();
    }, [token, reloading]);

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
        setReloading(true);
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
        <div className="user-panel-container">
            <h1 className="user-panel-header">Пользователи</h1>
            <input
                type="text"
                placeholder="Поиск пользователей"
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentUsers.map((_user) => (
                        <TableRow key={_user.id}>
                            <TableCell>{_user.id}</TableCell>
                            <TableCell>{_user.email}</TableCell>
                            <TableCell>
                                <Button variant="contained" className="custom-button me-2" onClick={() => handleEditClick(_user)}>
                                    Обновить
                                </Button>
                                <Button variant="contained" className="custom-button-secondary me-2" onClick={() => handleBanClick(_user.id)}>
                                    {_user.enabled ? 'Бан' : 'Разбан' }
                                </Button>
                                <Button variant="contained" className="custom-button-default" onClick={() => handleViewRecipes(_user)}>
                                    Рецепты пользователя
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isFormOpen} onClose={handleClose}>
                <DialogTitle>{'Обновить пользователя'}</DialogTitle>
                <DialogContent>
                    <UserForm
                        user={selectedUser}
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                    />
                </DialogContent>
            </Dialog>
            <Dialog open={isRecipePanelOpen} onClose={handleBackToUsers}>
                <DialogTitle>Рецепты пользователя</DialogTitle>
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
