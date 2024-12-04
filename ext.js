Ext.application({
    name: 'AuthApp',

    launch: function () {
        const app = new AuthApp();
        app.init();
    }
});

class AuthApp {
    constructor() {
        this.randomNames = [
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
        this.dataStore = this.createDataStore();
        this.authWindow = this.createAuthWindow();
    }

    init() {
        this.authWindow.show();
    }

    createFakeData() {
        return Array.from({ length: 10 }, () => ({
            name: this.randomNames[Math.floor(Math.random() * this.randomNames.length)],
            checked: false
        }));
    }

    createDataStore() {
        return Ext.create('Ext.data.Store', {
            fields: ['name', 'checked'],
            data: this.createFakeData()
        });
    }

    createAuthWindow() {
        const authForm = this.createAuthForm();
        return Ext.create('Ext.window.Window', {
            title: 'Авторизация',
            closable: false,
            modal: true,
            items: [authForm]
        });
    }

    createAuthForm() {
        return Ext.create('Ext.form.Panel', {
            width: 300,
            bodyPadding: 10,
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Login',
                    name: 'login',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Password',
                    name: 'password',
                    inputType: 'password',
                    allowBlank: false
                }
            ],
            buttons: [
                {
                    text: 'Submit',
                    handler: () => this.handleAuthSubmit()
                }
            ]
        });
    }

    handleAuthSubmit() {
        const form = this.authWindow.down('form').getForm();
        if (form.isValid()) {
            this.authWindow.hide();
            this.showGridWindow();
        } else {
            Ext.Msg.alert('Ошибка', 'Заполните все обязательные поля!');
        }
    }

    showGridWindow() {
        const gridWindow = Ext.create('Ext.window.Window', {
            title: 'Список записей',
            width: 500,
            height: 300,
            modal: true,
            layout: 'fit',
            items: [this.createGrid()],
            buttons: [
                {
                    text: 'OK',
                    handler: () => this.handleGridOk(gridWindow)
                },
                {
                    text: 'Cancel',
                    handler: () => this.handleGridCancel(gridWindow)
                }
            ]
        });

        gridWindow.show();
    }

    createGrid() {
        return Ext.create('Ext.grid.Panel', {
            store: this.dataStore,
            selModel: {
                type: 'checkboxmodel'
            },
            columns: [
                {
                    text: 'Name',
                    dataIndex: 'name',
                    flex: 1
                }
            ]
        });
    }

    handleGridOk(gridWindow) {
        const grid = gridWindow.down('grid');
        const selectedRecords = grid.getSelection();
        this.showViewport(selectedRecords);
        gridWindow.close();
    }

    handleGridCancel(gridWindow) {
        gridWindow.close();
        this.authWindow.show();
    }

    showViewport(selectedRecords) {
        const selectedData = selectedRecords.map(record => record.data);

        const viewportStore = Ext.create('Ext.data.Store', {
            fields: ['name', 'checked'],
            data: selectedData
        });

        Ext.create('Ext.container.Viewport', {
            layout: 'vbox',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Login',
                    readOnly: true,
                    value: this.authWindow.down('form').getForm().findField('login').getValue()
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Password',
                    inputType: 'password',
                    readOnly: true,
                    value: this.authWindow.down('form').getForm().findField('password').getValue()
                },
                {
                    xtype: 'grid',
                    title: 'Выбранные записи',
                    store: viewportStore,
                    columns: [
                        {
                            text: 'Name',
                            dataIndex: 'name',
                            flex: 1
                        }
                    ],
                    flex: 1,
                    width: '100%'
                }
            ]
        });
    }
}
