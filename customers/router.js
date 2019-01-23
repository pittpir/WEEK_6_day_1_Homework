let express = require('express');
let router = express.Router();
let model = require('./models.js');

router.get("/", function (request, response) {
	let customers = model.getCustomers();
	response.render('index_customers', { customers: customers })
});

router.get("/add/customers/", function(request, response) {
	response.render('_post_page_customers')
});

router.get("/:index", function (request, response) {
	let customerIndex = model.getCustomerIndex(request.params.index);
	response.render('_list_customers', { entries: customerIndex, index: request.params.index  });
});

router.get("/delete/:id", function(request, response) {
	let customerIndex = model.getCustomerIndex(request.params.index);
	response.render('_delete_page_customers', { entries: customerIndex, index: request.params.index })
});

router.post('/add/customers', (req,res) => {
	let newCustomerName = req.body['customer-name'];
	let newCustomerAge = req.body['customer-age'];
	let newCustomerSex = req.body['customer-sex'];
	let newCustomerLikes = req.body['customer-likes'];
	model.addCustomer( {name: newCustomerName, age: newCustomerAge, sex: newCustomerSex, likes: newCustomerLikes });    
	res.redirect('/customers');
})

router.delete('/delete/:id', (req,res) => {
	model.deleteCustomer(req.params.id);
	res.redirect('/customers');  //redirect will not work when using AJAX to make the delete request.
	res.end();
})


module.exports = router;