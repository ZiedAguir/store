const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

const { Model } = require('mongoose');


exports.getByName = (Model) =>
    asyncHandler(async (req, res, next) => {
      const { name } = req.params;
  
      if (!name || typeof name !== 'string') {
        return next(new ApiError('Invalid name parameter', 400));
      }
        req.filterObject = { name: { $regex: name, $options: 'i' } };
  
      const documentsCounts = await Model.countDocuments(req.filterObject);
      const apiFeatures = new ApiFeatures(Model.find(req.filterObject), req.query)
        .paginate(documentsCounts)
        .filter()
        .limitFields()
        .sort();
  
      const { mongooseQuery, paginationResult } = apiFeatures;
      const document = await mongooseQuery;
  
      if (!document || document.length === 0) {
        return next(new ApiError(`No document found with name: ${name}`, 404));
      }
  
      res.status(200).json({
        status: 'success',
        results: document.length,
        paginationResult,
        data: document,
      });
    });

exports.deleteOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const document = await Model.findByIdAndDelete(id);
        if (!document) {
            return next(new ApiError(`No document found for ID ${id}`, 404));
        }
        res.status(200).json({
            status: 'success',
            message: `Document with ID ${id} has been deleted successfully`,
        });
    });
exports.updateOne = (Model) => 
    asyncHandler(async(req,res,next)=>{
        const document = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true,
            });
        if (!document){
            return next(
                new ApiError(`no document for this id  ${req.params.id}`,404)
                );
        }
        res.status(200).json({data:document});
    });



exports.createOne = (Model) => 
   asyncHandler( async (req,res)=>{
        // async await:
        const document = await Model.create(req.body);
       res.status(201).json({
        status:"success",
        data: document});
        }) ;

exports.getOne = (Model) =>
asyncHandler(async (req,res,next)=>{
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document){
    return next(new ApiError(`no  document for this id ${id}`,404));
    }
    res.status(200).json({data:document})
});


exports.getAll = (Model,modelName = '') => 
    asyncHandler( async (req,res) => {
    
        // 1- filter:
        let filter = {};
        if(req.filterObject){
            filter = req.filterObject
        }
    
        // 1- build query :
        const documentsCounts = await Model.countDocuments();
        const apiFeatures = new ApiFeatures(Model.find(filter),req.query)
        .paginate(documentsCounts)
        .filter()
        .search(modelName)
        .limitFields()
        .sort()
        //.populate({path:'category',select:'name -_id'});
    
        // 2- Execute query :
    const {mongooseQuery,paginationResult} = apiFeatures;
    const document = await mongooseQuery;
    
    res.status(200).json({results:document.length,paginationResult, data:document});
    });
  

  