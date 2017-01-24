const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
	mongoose.connect('mongodb://localhost/users_test');
	mongoose.connection
		.once('open', () => { done(); })
		.on('error', () => {
			console.warn('Warning', error);
		});
});

beforeEach((done) => {
	// mongo normalizes the collection names to lowercase
	const { users, comments, blogposts } = mongoose.connection.collections;
	users.drop(() => {
		// Ready to run the next test!
		comments.drop(() => {
			blogposts.drop(() => {
				done();
			});
		});
	});
});
