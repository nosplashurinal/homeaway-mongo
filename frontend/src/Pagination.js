import React from "react";
import "styles/pagination.scss";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageArray: this.paginate(),
      activePage: this.props.activePage
    };
  }
  componentWillReceiveProps(nextProps) {
    this.props.count !== nextProps.count &&
      this.setState({
        pageArray: this.paginate()
      });
  }
  paginate() {
    const arr = [];
    let i = 1;
    while (i <= this.props.count) {
      arr.push(i);
      i++;
    }
    return arr;
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.activePage !== this.state.activePage) {
      this.props.onPaginationClick(this.state.activePage);
    }
  }
  render() {
    const { activePage, pageArray } = this.state;
    const { onPaginationClick } = this.props;
    const length = pageArray.length;
    return (
      <div className="homeaway-pagination no-select">
        {activePage !== pageArray[0] && (
          <a
            onClick={() =>
              this.setState({
                activePage: activePage === 0 ? activePage : activePage - 1
              })
            }
          >
            Previous
          </a>
        )}
        {activePage >= 10 && (
          <div>
            <button
              type="button"
              onClick={() => {
                onPaginationClick(1);
                this.setState({ activePage: 1 });
              }}
              key={1}
              className={`page_marker${activePage === 1 ? " active" : ""}`}
            >
              1
            </button>
          </div>
        )}
        {pageArray
          .map(page => (
            <button
              type="button"
              onClick={() => {
                onPaginationClick(page);
                this.setState({ activePage: page });
              }}
              key={page}
              className={`page_marker${activePage === page ? " active" : ""}`}
            >
              {page}
            </button>
          ))
          .filter(item => {
            const start = 10 * Math.floor(activePage / 10);
            return item.key >= start && item.key <= start + 10;
          })}
        {activePage !== length && (
          <a
            onClick={() =>
              this.setState({
                activePage: activePage === 20 ? activePage : activePage + 1
              })
            }
          >
            Next
          </a>
        )}
      </div>
    );
  }
}

export default Pagination;
