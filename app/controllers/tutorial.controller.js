const db=require('../models');
const Tutorial=db.tutorials;
const Op=db.Sequelize.Op;
const {client}=require('../../redisconnect');

exports.create=(req,res)=>{
    console.log('innn')
if(!req.body.title){
    res.status(400).send({
        message:'content can not be empty'
    });
    return;
}
exports.create=(req,res)=>{
    

}

// create tutorial
const tutorial = {
    title:req.body.title,
    description:req.body.description,
    published:req.body.published ? req.body.published : false
};
//save Tutorial in database
Tutorial.create(tutorial)
.then(data =>{
    res.send(data);
}).catch(err=>{
    res.status(500).send({
        message:
        err.message || 'some error occured while creating the tutorial'

    });
});
};
// exports.findAll = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
//     Tutorial.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };
  

//retrieve all tutorials from database
// exports.findAll=(req,res)=>{
//     const title=req.query.title;
//     var condition=title ? {title:{[Op.like]: '%${title}%'}
// } : null;
// Tutorial.findAll({where:condition})
// .then(data =>{
//     res.send(data);
// }).catch(err=>{
//     res.status(500).send({
//         message:
//             err.message || 'some error occur while retrieving tutorial'
//         });
//     })
// };
//find a single tutorial with an Id
exports.findOne=(req,res)=>{
    const id=req.params.id;

    Tutorial.findByPk(id)
    .then(data =>{
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({
            message:'Error retrieving Tutorial with id=' + id
        });
    });
};
//update a tutorial  by the id in the request
exports.update=(req,res)=>{
    const id=req.params.id;
    Tutorial.update(req.body,{
    where:{id:id}
    })
    .then(num =>{
        if(num == 1){
            res.send({
                message:'Tutorial was updated successfully'
            });

        }
        else{
            res.send({
                message:`Cannot update tutorial with id=${id}.maybe that id is not there`
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            message:'Error updating tutorial with this id='+id
        });
    });
};

//delete a tutorial with the specified id in the format
exports.delete=(req,res)=>{
    const id=req.params.id;
    Tutorial.destroy({
        where:{id:id}
    })
    .then(num=>{
        if(num == 1){
            res.send({
                message:'Tutorial was deleted successfully'
            });
        }else{
            res.send({
                message:`cannot delete tutorial with this ${id} id. may be this id id is not there`
            });
        }
    }).catch(err=>{
        res.status(500).send({
            message:'could not delete tutorial with this id' + id
        });
    });
};

//delete all tutorials from db
exports.deleteAll=(req,res)=>{
    Tutorial.destroy({
        where:{},
        truncate:false
    })
    .then(nums =>{
        res.send({message :`${nums} Tutorials was deleted successfully`})
    })
    .catch(err=>{
res.status(500).send({
    message:
    err.message || 'some error occuring while removing all tutorials'
});
    });
};

//find all published tutorials
// exports.findAllPublished=(req,res)=>{
//     Tutorial.findAll({
//         where:{
//             published:true
//         }
//     })
//     .then(data =>{
//         res.send(data);
//     })
//     .catch(err =>{
//         res.status(500).send({
//             message:
//             err.messsage || 'some error occur while retreiving tutorials'
//         });
//     });
// };



// exports.findAll=(req,res)=>{

// };

// exports.findOne=(req,res)=>{

// };
// exports.update=(req,res)=>{

// };
// exports.delete=(req,res)=>{

// };
// exports.deleteAll=(req,res)=>{

// };
// exports.findAllPublished=(req,res)=>{

// };

const getPagination=(page,size)=>{
    const limit=size?+size:3;
    const offset=page?page*limit:0;

    return{limit,offset};
}
const getPagingData=(data,page,limit)=>{
const{count:totalItems,rows:tutorials}=data;
const currentPage=page ? +page:0;
const totalPages=Math.ceil(totalItems/limit);
return{totalItems,tutorials,totalPages,currentPage};

};

exports.findAll = (req, res) => {
    const { page, size, title } = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    const { limit, offset } = getPagination(page, size);
  
    Tutorial.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  
  //find all published Tutorial
  exports.findAllPublished = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
  
    Tutorial.findAndCountAll({ where: { published: true }, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  