Ext.application({
    name: 'AuthApp',

    launch: function () {
        const randomNames = [
            'Иван Иванов',
            'Петр Петров',
            'Сергей Сергеев',
            'Александр Александров',
            'Дмитрий Дмитриев',
            'Максим Максимов',
            'Екатерина Екатерина',
            'Ольга Ольгина',
            'Анастасия Анастасиева',
            'Мария Мариевна'
        ];

        const createFakeData = () => {
            return Array.from({
                length: 10
            }, () => ({
                name: randomNames[Math.floor(Math.random() * randomNames.length)],
                checked: false
            }));
        };

        const dataStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'checked'],
            data: createFakeData()
        });

        const authForm = Ext.create('Ext.form.Panel', {
            width: 300,
            bodyPadding: 10,
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Login',
                name: 'login',
                allowBlank: false
            }, {
                xtype: 'textfield',
                fieldLabel: 'Password',
                name: 'password',
                inputType: 'password',
                allowBlank: false
            }],
            buttons: [{
                text: 'Submit',
                handler: function () {
                    const form = authForm.getForm();
                    if (form.isValid()) {
                        authWindow.hide();
                        showGridWindow();
                    } else {
                        Ext.Msg.alert('Ошибка', 'Заполните все обязательные поля!');
                    }
                }
            }]
        });

        const authWindow = Ext.create('Ext.window.Window', {
            title: 'Авторизация',
            closable: false,
            modal: true,
            items: [authForm]
        });

        const showGridWindow = () => {
            const gridWindow = Ext.create('Ext.window.Window', {
                title: 'Список записей',
                width: 500,
                height: 300,
                modal: true,
                layout: 'fit',
                items: [{
                    xtype: 'grid',
                    store: dataStore,
                    selModel: {
                        type: 'checkboxmodel'
                    },
                    columns: [{
                        text: 'Name',
                        dataIndex: 'name',
                        flex: 1
                    }]
                }],
                buttons: [{
                    text: 'OK',
                    handler: function () {
                        const selectedRecords = gridWindow.down('grid').getSelection();
                        showViewport(selectedRecords);
                        gridWindow.close();
                    }
                }, {
                    text: 'Cancel',
                    handler: function () {
                        gridWindow.close();
                        authWindow.show();
                    }
                }]
            });

            gridWindow.show();
        };

        const showViewport = (selectedRecords) => {
            const selectedData = selectedRecords.map(record => record.data);

            const viewportStore = Ext.create('Ext.data.Store', {
                fields: ['name', 'checked'],
                data: selectedData
            });

            Ext.create('Ext.container.Viewport', {
                layout: 'vbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Login',
                    readOnly: true,
                    value: authForm.getForm().findField('login').getValue()
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Password',
                    inputType: 'password',
                    readOnly: true,
                    value: authForm.getForm().findField('password').getValue()
                }, {
                    xtype: 'grid',
                    title: 'Выбранные записи',
                    store: viewportStore,
                    columns: [{
                        text: 'Name',
                        dataIndex: 'name',
                        flex: 1
                    }],
                    flex: 1,
                    width: '100%'
                }]
            });
        };

        authWindow.show();
    }
});
