import React from 'react';
import Dragula from 'react-dragula';
import 'react-dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

//The Board component is a class that extends React.Component. 
//React.Component is a base class for React components when they are defined using ES6 classes.
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'inProgress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    }
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    }
  }

  componentDidMount() {
    const containers = [
      this.swimlanes.backlog.current,
      this.swimlanes.inProgress.current,
      this.swimlanes.complete.current
    ];

    this.drake = Dragula(containers, {
      moves: (el, container, handle) => {
        return handle.classList.contains('Card');
      },
      copy: true,  // Create a copy instead of moving the original element
      removeOnSpill: true  // Remove the copy if it's not dropped into a container
    });

    this.drake.on('drop', (el, target, source, sibling) => {
      // Get the client ID and new status
      const clientId = el.id;
      const newStatus = this.getStatusFromContainer(target);

      // Remove the temporary copy created by Dragula
      el.remove();

      // Update the state
      this.setState(prevState => {
        const updatedClients = {...prevState.clients};
        let movedClient;

        // Find and remove the client from its original status
        for (let status in updatedClients) {
          const index = updatedClients[status].findIndex(client => client.id === clientId);
          if (index !== -1) {
            movedClient = {...updatedClients[status][index], status: newStatus};
            updatedClients[status].splice(index, 1);
            break;
          }
        }

        // Add the client to its new status
        if (movedClient) {
          updatedClients[newStatus].push(movedClient);
        }

        return {clients: updatedClients};
      });
    });
  }
  
  componentWillUnmount() {
    this.drake.destroy();
  }

  getStatusFromContainer(container) {
    if (container === this.swimlanes.backlog.current) return 'backlog';
    if (container === this.swimlanes.inProgress.current) return 'inProgress';
    if (container === this.swimlanes.complete.current) return 'complete';
    return '';
  }

  //Here we have listed the clients in the board.
  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'backlog'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'backlog'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'backlog'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'backlog'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'backlog'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'backlog'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'backlog'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'backlog'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'backlog'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }

  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref}/>
    );
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('Backlog', this.state.clients.backlog, this.swimlanes.backlog)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('In Progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', this.state.clients.complete, this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
