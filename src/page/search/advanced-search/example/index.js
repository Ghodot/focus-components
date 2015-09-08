Focus.reference.config.set({
    scopes() {
        return new Promise(success => {
            success([
                {
                    code: 'SCP1',
                    label: 'Scope 1'
                },
                {
                    code: 'SCP2',
                    label: 'Scope 2'
                },
                {
                    code: 'SCP3',
                    label: 'Scope 3'
                }
            ]);
        });
    }
});

Focus.definition.entity.container.setEntityConfiguration({
    contact: {
        firstName: {
            domain: 'DO_TEXT',
            required: false
        },
        lastName: {
            domain: 'DO_TEXT',
            required: true
        },
        age: {
            domain: 'DO_NUMBER',
            required: false
        },
        email: {
            domain: 'DO_EMAIL',
            required: false
        }
    }
});

let countId = 0;

const facets = {
    FCT_PAYS: {
        France: 5,
        Germany: 8
    },
    FCT_STATUS: {
        Open: 7,
        Closed: 2,
        'Status 1': 2,
        'Status 2': 2,
        'Status 3': 2,
        'Status 4': 2,
        'Status 5': 2
    },
    FCT_REGION: {
        'Ile de France': 11,
        'Nord - Pas de Calais': 6
    }
};

const getSearchService = (scoped) => {
    return (criteria) => {
        return new Promise(success => {
            window.setTimeout(() => {
                const groups = {
                    Test: [
                        {
                            id: countId++,
                            firstName: 'toto',
                            lastName: 'ceci est un test'
                        },
                        {
                            id: countId++,
                            firstName: 'tata',
                            lastName: 'deuxieme test'
                        }
                    ],
                    Autre: [
                        {
                            id: countId++,
                            firstName: 'toto',
                            lastName: 'ceci est un test'
                        },
                        {
                            id: countId++,
                            firstName: 'tata',
                            lastName: 'deuxieme test'
                        }
                    ]
                };

                const list = [
                    {
                        id: countId++,
                        firstName: 'toto',
                        lastName: 'ceci est un test'
                    },
                    {
                        id: countId++,
                        firstName: 'tata',
                        lastName: 'deuxieme test'
                    }
                ];

                const payload = scoped ? list : groups;
                const data = {
                    facets,
                    [scoped ? 'list' : 'groups']: payload,
                    totalCount: 20
                };
                success(data);
            }, 1000);
        });
    }
};

const service = {
    unscoped: getSearchService(false),
    scoped: getSearchService(true)
};

const Line = React.createClass({
    mixins: [FocusComponents.list.selection.line.mixin],
    definitionPath: 'contact',
    renderLineContent(data) {
        return (
            <div>
                {this.displayFor('firstName', {})}
                {this.displayFor('lastName', {})}
            </div>
        );
    }
});

const Group = React.createClass({
    render() {
        const Title = FocusComponents.common.title.component;
        const Button = FocusComponents.common.button.action.component;
        return (
            <div className='listResultContainer panel' data-focus='group-result-container'>
                <Title title={this.props.groupKey}/>
                <div className='resultContainer'>
                    {this.props.children}
                </div>
                <Button  handleClickAction={this.props.showAll(this.props.groupKey)} label='Show all'/>
            </div>
        );
    }
});

const advancedSearchProps = {
    facetConfig: {
        FCT_PAYS: 'text',
        FCT_STATUS: 'text',
        FCT_REGION: 'text'
    },
    orderableColumnList: [
        {key: 'col1', order: 'desc', label: 'Colonne 1 desc'},
        {key: 'col1', order: 'asc', label: 'Colonne 1 asc'},
        {key: 'col2', order: 'desc', label: 'Colonne 2 desc'},
        {key: 'col2', order: 'asc', label: 'Colonne 2 asc'}
    ],
    operationList: [
        {
            label: 'Button1_a',
            action() {
                alert('Button1a');
            },
            style: {},
            priority: 1
        },
        {
            label: 'Button1_b',
            action() {
                alert('Button1b');
            },
            style: {},
            priority: 1
        },
        {
            label: 'Button2_a',
            action() {
                alert('Button2a');
            },
            style: {},
            priority: 2
        },
        {
            label: 'Button2_b',
            action() {
                alert('Button2b');
            },
            style: {},
            priority: 2
        }
    ],
    onLineClick({id}) {
        alert('click sur la ligne ' + id);
    },
    isSelection: true,
    lineOperationList: [
        {
            label: 'Button1_a',
            action({tile}) {
                alert(title);
            },
            style: {},
            priority: 1
        },
        {
            label: 'Button1_b',
            action({tile}) {
                alert(title);
            },
            style: {},
            priority: 1
        },
        {
            label: 'Button2_a',
            action({tile}) {
                alert(title);
            },
            style: {},
            priority: 2
        },
        {
            label: 'Button2_b',
            action({tile}) {
                alert(title);
            },
            style: {},
            priority: 2
        }
    ],
    criteria: {
        scope: 'Scope',
        searchText: 'value'
    },
    idField: 'id',
    unselectedScopeAction() {
        alert('unselect scope')
    },
    exportAction() {
        alert('export')
    },
    service,
    lineComponentMapper: function(list) {
        return Line;
    },
    groupComponent: Group,
    groupMaxRows: 1
};

const AdvancedSearch = FocusComponents.page.search.advancedSearch.component;

return <AdvancedSearch {...advancedSearchProps} />;
