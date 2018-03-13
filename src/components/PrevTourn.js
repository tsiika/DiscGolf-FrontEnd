import React, { Component } from 'react';


class previousTournament extends Component {
    render() {
        return (
            <div>
                <table>
                <h3>Previous tournaments:</h3>
                    <tr>
                        <th>Tournament</th>
                        <th>Placement</th>
                        <th>Points</th>
                    </tr>
                    <tr>
                        <td>Test tournament 1</td>
                        <td>23</td>
                        <td>2345</td>
                    </tr>
                    <tr>
                        <td>Test tournament 2</td>
                        <td>2</td>
                        <td>3627</td>
                    </tr>
                    <tr>
                        <td>Test tournament 3</td>
                        <td>7</td>
                        <td>1542</td>
                    </tr>
                </table>
            </div>
        )
    }
}
export default previousTournament;