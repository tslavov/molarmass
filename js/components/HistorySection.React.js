var React = require('react');
var MolarMassActions = require('../actions/MolarMassActions');

var HistorySection = React.createClass({
  _buildTableRow: function (index, formula, mass) {
    return (
      <tr key={index}>
        <td onClick={this._autoFillInput}>{formula}</td>
        <td>{mass}</td>
        <td>
          <i className="fa fa-trash" onClick={this._deleteHistoryItem.bind(this, index)}></i>
        </td>
      </tr>
    );
  },

  _buildTableBody: function (historyItems) {
    var rows = [];

    for (var key in historyItems) {
      var item = historyItems[key];
      rows.push(this._buildTableRow(key, item.formula, item.mass));
    }

    return rows;
  },

  _autoFillInput: function (event) {
    MolarMassActions.update(event.target.innerText);
  },

  _deleteHistoryItem: function (index, event) {
    MolarMassActions.delete(index)
  },

  render: function () {
    var tbody = this._buildTableBody(this.props.history);

    return (
      <div id="historySection" className="pure-u-1-1 pure-u-md-1-2" hidden={this.props.history.length == 0}>
        <div className="pure-u-1-24"></div>
        <div className="pure-u-22-24">
        <h3>History</h3>
          <table className="pure-table">
            <thead>
              <tr>
                <th>Formula</th>
                <th>Mass (g/mol)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tbody}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = HistorySection;
