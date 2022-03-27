import './App.css';
import { Component } from 'react';
import TableOfContent from "./components/TableOfContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import ReadContent from "./components/ReadContent"
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props) {
    super(props)
    this.max_content_id = 3
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      welcome: { title: 'Welcome', desc: 'hello welcom' },
      subject: {
        title: 'WEB',
        sub: 'World wide web!'
      },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is HyperText...' },
        { id: 2, title: 'CSS', desc: 'CSS is for design...' },
        { id: 3, title: 'JS', desc: 'JS is good...' },
      ]
    }
  }

  getReadContent() {
    for (var i = 0; i < this.state.contents.length; i++) {
      var _contents = this.state.contents[i]
      if (_contents.id == this.state.selected_content_id) {
        return _contents
      }
    }
  }

  getArticle() {
    var _article, _contents = null
    if (this.state.mode == 'welcome') {
      _article = <ReadContent title="welcome" desc="good"></ReadContent>
    } else if (this.state.mode == 'read') {
      _contents = this.getReadContent()
      _article = <ReadContent title={_contents.title} desc={_contents.desc}></ReadContent>
    } else if (this.state.mode == 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        this.max_content_id = this.max_content_id + 1
        var _contents = this.state.contents.concat(
          { id: this.max_content_id, title: _title, desc: _desc }
        )
        this.setState({
          contents: _contents,
          mode: "read",
          selected_content_id: this.max_content_id
        })

      }.bind(this)}></CreateContent>
    } else if (this.state.mode == 'update') {
      _contents = this.getReadContent()
      _article = <UpdateContent
        content={_contents}
        onSubmit={function (_id, _title, _desc) {
          var _contents = Array.from(this.state.contents)
          for (var i = 0; i < _contents.length; i++) {
            if (_contents[i].id == _id) {
              _contents[i] = {id: _id, title: _title, desc: _desc}
              break;
            }
          }
          this.setState({
            contents: _contents,
            mode: "read"
          })

        }.bind(this)}
      >

      </UpdateContent>
    }

    return _article
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' })
          }.bind(this)}
        >
        </Subject>
        <Subject
          title="React"
          sub="for ui"
          onChangePage={function () {
            this.setState({ mode: 'read' })
          }.bind(this)}
        >
        </Subject>
        <TableOfContent
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            })
          }.bind(this)}
        ></TableOfContent>

        <Control onChangeMode={function (_mode) {
          if (_mode == "delete") {
            if (window.confirm('really?')) {
              var _contents = Array.from(this.state.contents)
              for (var i = 0; i < _contents.length; i++) {
                if (_contents[i].id == this.state.selected_content_id) {
                  _contents.splice(i, 1)
                  break;
                }
              }
            }

            this.setState({
              mode: 'welcome',
              contents: _contents
            })
            alert("deleted!")
          }
          this.setState({
            mode: _mode
          })
        }.bind(this)}></Control>
        {this.getArticle()}
      </div>
    );
  }
}

export default App;
