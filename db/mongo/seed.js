db = db.getSiblingDB("waitme");
db.tables.drop();
db.tables.save( {table_number : "Table 1" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "Table 2" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "Table 3" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "Table 4" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "Table 5" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "Table 6" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "Table 7" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "Table 8" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "Table 9" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "Table 10" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "waitlist" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });
db.tables.save( {table_number : "reservation" , capacity : 4 , createdAt : new Date(1079895594000) , updatedAt : new Date(1079895594000) , parties : null ,table_status : null });

db.party_statuses.drop();
db.party_statuses.save( {name : "upcoming"} );
db.party_statuses.save( {name : "seated"} );
db.party_statuses.save( {name : "left"} );

db.party_types.drop();
db.party_types.save( {name : "walkin"} );
db.party_types.save( {name : "reservation"} );
db.party_types.save( {name : "waitlist"} );

db.table_statuses.drop();
db.table_statuses.save( {name : "seated"} );
db.table_statuses.save( {name : "appetizer"} );
db.table_statuses.save( {name : "entree"} );
db.table_statuses.save( {name : "dessert"} );
db.table_statuses.save( {name : "bill"} );
db.table_statuses.save( {name : "left"} );
db.table_statuses.save( {name : "queued"} );