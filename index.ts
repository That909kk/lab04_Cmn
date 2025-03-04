  const express = require('express');
  const app = express();
  let data = require('./data.ts');
  app.use(express.json({ extended: true }));
  app.use(express.static('./views'));
  app.set('view engine', 'ejs');
  app.set('views', './views');
  const bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  app.get('/', (req, res) => {
    
    return res.render('index', {data: data});
  });
  app.post('/save', (req, res) => {
    const id =req.body.id;
    const name = req.body.name;
    const course_type = req.body.course_type;
    const semester = req.body.semester;
    const department = req.body.department;

    const newData = {
        "id": id,
        "name": name,
        "course_type": course_type,
        "semester": semester,
        "department": department
        }
    data.push(newData);
    return res.redirect('/');   
  } );
// app.post('/save', (req, res) => {
//     const newCourse = req.body;
//     data.push(newCourse);
//     res.redirect('/');
// });

app.get('/delete', (req, res) => {
  const listCheckboxSelected = req.query.checkbox;
  if(listCheckboxSelected.length <= 0){
    return res.redirect('/');
  }

  function onDeleteItem(length){
    const macanxoa =Number(listCheckboxSelected[length-1]);
    data = data.filter((item) => item.id !== macanxoa);
    if(length >0){
      console.log('Data delete: ', JSON.stringify(data));
      onDeleteItem(length-1);

    }else return res.redirect('/');


  }
  onDeleteItem(listCheckboxSelected.length-1);
});

  app.listen(3000, () => {
      console.log('Server is running on port 3000');
  });