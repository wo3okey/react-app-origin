import { Component } from 'react';

class TableOfContent extends Component {
    shouldComponentUpdate(newProps, newState) {
        if (this.props.data == newProps.data) {
            return false
        }
        return true
    }

    render() {
        var lists = [];
        var value = this.props.data
        var i = 0;
        while (i < value.length) {
            lists.push
                (<li key={value[i].id}>
                    <a
                        href={"/content/" + value[i].id}
                        data-id={value[i].id}
                        onClick={function(e){
                            e.preventDefault()
                            this.props.onChangePage(e.target.dataset.id)
                        }.bind(this)}
                    >{
                    value[i].title}
                    </a>
                </li>)
            i = i + 1
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}
export default TableOfContent