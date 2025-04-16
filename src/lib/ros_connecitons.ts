import ROSLIB from 'roslib';

class ROSConnection {
  ros: ROSLIB.Ros;
  isConnected: boolean = false;
  
  constructor(url: string = 'ws://localhost:9090') {
    // Connect to rosbridge
    this.ros = new ROSLIB.Ros({
      url: url,
    });

    this.setupConnectionHandlers();
  }

  private setupConnectionHandlers() {
    this.ros.on('connection', () => {
      console.log('Connected to websocket server.');
      this.isConnected = true;
    });

    this.ros.on('error', (error) => {
      console.error('Error connecting to websocket server: ', error);
      this.isConnected = false;
    });

    this.ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      this.isConnected = false;
    });
  }

  /**
   * Publishes an emergency stop command
   * @param stop - true to stop, false to resume
   */
  publishEmergencyStop(stop: boolean) {
    const emergencyStopTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/emergency_stop',
      messageType: 'std_msgs/Bool'
    });

    const message = new ROSLIB.Message({
      data: stop
    });

    emergencyStopTopic.publish(message);
    console.log(`Emergency stop ${stop ? 'activated' : 'deactivated'}`);
  }
}

// Create and export a singleton instance
const rosConnection = new ROSConnection();
export default rosConnection;
