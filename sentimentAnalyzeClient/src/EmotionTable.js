import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <thead>
                <tr>
                    <th  style={{textAlign:'center'}}> Sentiment</th> 
                    <th  style={{textAlign:'center'}}> Score</th>
                </tr>
            </thead>

            <tbody>
            {
                Object.keys(this.props.emotions).map(em=>(
                    <tr>
                     <td style={{textAlign:'center'}}>{em}</td> 
                     <td  style={{textAlign:'center'}}>{this.props.emotions[em]}</td> 
                    </tr>
                ))
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
