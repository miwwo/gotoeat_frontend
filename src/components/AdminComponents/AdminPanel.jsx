// components/AdminPanel.js
import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import IngredientPanel from "./Ingredient/IngredientPanel";
import UserPanel from "./Users/UserPanel";
import './styles/AdminPanel.css'; // Импортируем файл стилей

const AdminPanel = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <div className="admin-panel-container">
            <h1 className="admin-panel-header">Панель администратора</h1>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                classes={{ indicator: 'custom-tab-indicator' }}
                className="admin-panel-tabs"
            >
                <Tab label="Ингредиенты" className="custom-tab" />
                <Tab label="Пользователи" className="custom-tab" />
            </Tabs>
            <Box hidden={tabIndex !== 0} className="custom-tab-content">
                <IngredientPanel />
            </Box>
            <Box hidden={tabIndex !== 1} className="custom-tab-content">
                <UserPanel />
            </Box>
        </div>
    );
};

export default AdminPanel;
