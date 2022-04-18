const express = require('express');
const router = express.Router();
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');

const multer = require('multer');
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })




router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/:id', catchAsync(campgrounds.showCampgroud));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;
