import React, { Component } from 'react';


class previousMatch extends Component {
    render() {
        return (
            <div>
                <h3>Last three (3) matches:</h3>
                <table>
                    <tr>
                        <th>Course</th>
                        <th>Throws</th>
                        <th>Time</th>
                    </tr>
                    <tr>
                        <td>Test course 1</td>
                        <td>23</td>
                        <td>1:23:45</td>
                    </tr>
                    <tr>
                        <td>Test course 2</td>
                        <td>17</td>
                        <td>36:27</td>
                    </tr>
                    <tr>
                        <td>Test course 3</td>
                        <td>37</td>
                        <td>1:15:42</td>
                    </tr>
                </table>
            </div>
        )
    }
}
export default previousMatch;
