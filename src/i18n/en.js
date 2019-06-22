import englishMessages from 'ra-language-english';

export default {
    ...englishMessages,
    pos: {
        title: 'Gekko Cloud',
        version: 'Version: %{version}',
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        login: {
            loading: "Loading..."
        }
    },
    configuration: {
        auth: {
            title: 'Authentication',
            username: 'Username',
            pwd: 'Password'
        },
        gekko: {
            title: 'Gekko',
            endpoint: 'Server Address',
            wsEndpoint: 'Websocket Endpoint'
        }
    },
    dashboard: {
        title: 'Home',
        cards: {
            walletInfo: {
                title: 'My Wallet',
                seeMore: 'See more'
            },
            help: {
                title: 'Help'
            },
            favorites: {
                title: 'Favorites'
            }
        }
    },
    resources: {
        users: {
            name: 'User |||| Users',
            fields: {
                fullName: 'Fullname',
                username: 'Username',
                firstName: 'First Name',
                setManualPassword: 'Set Manual Password',
                lastName: 'Surname',
                mailPrimary: 'Mail',
                password: 'Password',
                role: 'Role',
                enabled: 'Enabled'
            },
            form: {
                actions: 'Actions',
                action: {
                    reset_password: 'Reset Password',
                    reset_passwordSuccessMessage: 'Password has changed successfully'
                },
                title: '%{title}',
                audit: 'Aduit',
                role: 'Role',
                security: 'Security',
                summary: 'Summary',
                systems: 'Systems'
            }
        },
        roles: {
            name: 'Role |||| Roles',
            fields: {
                name: 'Role',
                description: 'Description',
                authorities: 'Authorities',
                users: 'Users'
            },
            list: {
                search: 'Search',
            },
            form: {
                summary: 'Summary',
                authorities: 'Authorities'
            },
            edit: {
                title: 'Role "%{title}"',
            },
            action: {
                save: 'Save'
            },
            systemRole: {
                root: {
                    name: 'Platform Admin',
                    description: 'User responsible by platform administration.'
                },
            }
        },
        "crypto-currencies": {
            name: 'Crypto Currency |||| Crypto Currencies',
            fields: {
                id: 'Symbol',
                name: 'Name',
                enabled: 'Enabled'
            }
        },
        backtests: {
            name: 'Backtest |||| Backtests',
            detail: 'Detail',
            fields: {
                parentId: 'Backtest Parent ID',
                id: 'Id',
                tradingAdvisor: {
                    method: 'Strategy'
                },
                market: {
                    exchange: 'Exchange',
                    currency: 'Currency',
                    asset: 'Asset'
                },
                performanceReport: {
                    trades: 'Amount of Trades',
                    startTime: "Start Time",
                    endTime: "End Time",
                    timespan: 'Timespan',
                    market: "Market",
                    profit: "Profit",
                    startBalance: 'Start Balance',
                    balance: 'End Balance',
                    relativeProfit: "Simulated Profit",
                    startPrice: 'Start Price',
                    endPrice: 'End Price',
                },
                /* Filter */
                onlyPositiveProfit: 'Only positive profit',
                date_gte: 'Executed Since',
                date_lte: 'Executed Before',
            }
        },
        backtestEditor: {
            name: 'Backtest Editor'
        },
        systemProfile: {
            name: 'System Profile'
        },
        imports: {
            name: 'a new Import Request |||| Current Imports',
            fields: {
                watch: {
                    exchange: "Exchange",
                    currency: "Currency",
                    asset: "Asset",
                    assets: "Assets"
                },
                importer: {
                    daterange: {
                        from: "From",
                        to: "To",
                    }
                },
                candleWriter: {
                    enabled: 'Candle Writer enabled'
                },
                latest: "Latest",
                from: "From",
                to: "To",
                duration: "Duration",
                done: "Completed"
            }
        },
        datasets: {
            name: 'DataSet |||| DataSets',
            fields: {
                exchange: "Exchange",
                currency: "Currency",
                asset: "Asset",
                from: "From",
                to: "To",
                duration: "Duration"
            }
        },
        subscriptions: {
            name: 'Subscription |||| Subscriptions',
            fields: {
                exchange: "Exchange",
                currency: "Currency",
                asset: "Asset"
            }
        },
        sandboxBacktest: {
            name: 'Sandbox Backtest'
        },
        mySpace: {
            name: 'My Space'
        },
        workspaces: {
            name: 'My Workspace',
            configuration: {
                name: 'Configuration'
            }
        },
        plugins: {
            name: 'Plugin |||| Plugins'
        },
        settings: {
            name: 'Settings',
        },
        extensions: {
            name: 'Extensions',
        }
    },
    products: {
        uam: 'User Access and Management',
        platform: 'Cloud Platform'
    },
    countries: {
        br: 'Brazil',
        us: 'United States',
        ie: 'Ireland',
        other: 'Other'
    },
    errors: {
        'system': 'Internal System Error.'
    }
};
