import React from 'react';
import Navigation from './Navigation';
import axios from 'axios';

class Add  extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            name:"",
            campus:"",
            gpa:"",
            url:"",
            location:"",
            description:"",
            img:""
        }
    }

    submit = (event) =>{
        event.preventDefault();
       
        
        if(this.props.name.toUpperCase()==="STUDENT"){
            let info;
           

            try{
                let campusName = this.props.info.location.state.campus;
                info ={
                   
                    name: event.target[0].value,
                    campusName: event.target[1].value,
                    gpa: event.target[2].value,
                    url: event.target[3].value
                }

                let validGpa = (Number(info.gpa) >0.0 && Number(info.gpa) < 4.0);

                if(info.name && validGpa && info.campusName){
                    this.props.addOnCampus(info)
                }else{
                    alert("Name and GPA must be provide!, try again.")
                }
                
               
            }catch(e){ // add student
                info ={
                    name: event.target[0].value,
                    campusName: event.target[1].value,
                    gpa: event.target[2].value,
                    url: event.target[3].value
                }

               let info2 ={
                    name: event.target[0].value,
                    campus: event.target[1].value,
                    gpa: event.target[2].value,
                    url: event.target[3].value
                }

                
                let validGpa = (Number(info.gpa) >0.0 && Number(info.gpa) < 4.0);

                if(info.name && validGpa && info.campusName){
                    axios.post('http://localhost:3000/addStudent', info2)
                      .then(function (response) {
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                    this.props.add(info);
                }else{
                    alert("Name, campus, and GPA must be provide, try again.")
                }
              
            }
            
        }else{
            let info ={
                   
                campusName: event.target[0].value,
                location: event.target[1].value,
                description: event.target[2].value,
                img: event.target[3].value,
                campusStudents:[]
            }

            let info2 ={
                   
                campusname: event.target[0].value,
                location: event.target[1].value,
                description: event.target[2].value,
                img: event.target[3].value,
                
            }

            if(info.campusName){
                axios.post('http://localhost:3000/addCampus', info2)
                      .then(function (response) {
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                this.props.add(info);
            }else{
                alert("Name can not be empty, try again!")
            }
            
        }
        
        

    }

    nameChange = (e) =>{
        this.setState({name: e.target.value})
    }

    campusChange = (e) =>{
        this.setState({campus: e.target.value})
    }

    urlChange = (e) =>{
        this.setState({url: e.target.value})
    }

    gpaChange = (e) =>{
        this.setState({gpa: e.target.value})
    }

    locationChange = (e) =>{
        this.setState({location: e.target.value})
    }

    imgChange = (e) =>{
        this.setState({img: e.target.value})
    }

    descriptionChange = (e) =>{
        this.setState({description: e.target.value})
    }

    options = () =>{
        if(this.props.name.toUpperCase()=="STUDENT"){
            let defaultValue;
            try{
                defaultValue = this.props.info.location.state.campus
            }catch(e){
                defaultValue = this.state.campus
            }

            return(
                // ADDING A STUDENT
                <form onSubmit={this.submit} className="center-txt" >

                    <h2>{this.props.name.toUpperCase()} NAME</h2>
                    <input type="text" value={this.state.name} onChange={this.nameChange} />
                    <p><lable>Campus</lable></p>
                    <input type="text" value={defaultValue } onChange={this.campusChange}/>

                    <p><lable>GPA</lable></p>
                    <input type="text" value={this.state.gpa } onChange={this.gpaChange}/>

                    <p><lable>Img url</lable></p>
                    <input type="text" value={this.state.url}  onChange={this.urlChange} />

                    <div>
                        <input type ="submit" value={"Add " + this.props.name} /> 
                    </div>

                </form>

            )
        }else{
            return (
                // ADDING A Campus
                <form onSubmit={this.submit} className="center-txt" >

                    <h2>{this.props.name.toUpperCase()} NAME</h2>
                    <input type="text" value={this.state.campus} onChange={this.campusChange} />

                    <p><lable>Location</lable></p>
                    <input type="text" value={this.state.location} onChange={this.locationChange}/>

                    <p><lable>Description</lable></p>
                   <textarea onChange={this.descriptionChange} value={this.state.description}  rows="6" cols="50" >                        
                    </textarea>

                    <p><lable>Img Url</lable></p>
                    <input type="text" value={this.state.img}  onChange={this.imgChange} />


                    <div>
                        <input type ="submit" value={"Add " + this.props.name} /> 
                    </div>

                </form>

            )
        }
    }

    render(){ 
        return (
            <div>
                <Navigation />
                {this.options()}
            </div>
        )
    }
}

export default Add;