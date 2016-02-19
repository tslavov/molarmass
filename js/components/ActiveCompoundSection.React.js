var React = require('react');

var ActiveCompoundSection = React.createClass({
  render: function () {
    var formulaAsHTML = {
      __html: this.props.formula.replace(/[0-9]+/g, '<sub>$&</sub>')
    };

    return (
      <div id="activeCompoundSection" className="pure-u-1-1 pure-u-md-1-2">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-22-24">
          <h1 className="chemicalText" dangerouslySetInnerHTML={formulaAsHTML}></h1>
          <p>Molar Mass: {this.props.mass}</p>

          <table className="pure-table">
            <thead>
              <tr>
                <th>Element</th>
                <th>Molar Mass</th>
                <th>Quantity</th>
                <th>Total Mass</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = ActiveCompoundSection;
