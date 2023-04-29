// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ProjectSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   startDate: {
//     type: String,
//     required: true
//   },
//   endDate: {
//     type: String,
//     required: true
//   },
//   team: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Emplyer',
//       default: []
//     }
//   ],
//   tasks: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Task',
//       default: []
//     }
//   ],
//   projectManager: {
//     type: Schema.Types.ObjectId,
//     ref: 'Emplyer'
    
//   }
// });

// module.exports = mongoose.model('Project', ProjectSchema);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ProjectSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   startDate: {
//     type: String,
//     required: true
//   },
//   endDate: {
//     type: String,
//     required: true
//   },
//   team: [
//     {
//       employer: {
//         type: Schema.Types.ObjectId,
//         ref: 'Emplyer',
//         required: true,
//         select: ['fullname', 'picture', 'email', 'phone', 'address', 'salary', 'departement']
//       },
//       tasks: [
//         {
//           type: Schema.Types.ObjectId,
//           ref: 'Task',
//           default: []
//         }
//       ]
//     }
//   ],
//   projectManager: {
//     type: Schema.Types.ObjectId,
//     ref: 'Emplyer',
//     select: ['fullname', 'picture', 'email', 'phone', 'address', 'salary', 'departement']
//   }
// });

// module.exports = mongoose.model('Project', ProjectSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = mongoose.model(
  "project",
  new mongoose.Schema({


  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  team: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Emplyer',
      default: []
    }
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      default: []
    }
  ],
  projectManager: {
    type: Schema.Types.ObjectId,
    ref: 'Emplyer'
  }
})


);

module.exports = project;
// ProjectSchema.virtual('employerName', {
//   ref: 'Employer',
//   localField: 'team',
//   foreignField: '_id',
//   justOne: true,
//   select: 'fullname'
// });

// module.exports = mongoose.model('Project', ProjectSchema);