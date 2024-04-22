class PriorityQueue {
    constructor() {
      this.elements = [];
    }
  
    enqueue(element, priority) {
      const newNode = { element, priority };
      if (this.isEmpty()) {
        this.elements.push(newNode);
      } else {
        // Вставка з урахуванням пріоритету
        const index = this.elements.findIndex(
          (node) => node.priority > newNode.priority
        );
        if (index === -1) {
          this.elements.push(newNode);
        } else {
          this.elements.splice(index, 0, newNode);
        }
      }
    }
  
    dequeue() {
      if (this.isEmpty()) {
        throw new Error("Черга порожня");
      }
      return this.elements.shift();
    }
  
    isEmpty() {
      return this.elements.length === 0;
    }
  }
  
  class Graph {
    constructor() {
      this.adjList = new Map();
    }
  
    addVertex(vertex) {
      if (!this.adjList.has(vertex)) {
        this.adjList.set(vertex, []);
      }
    }
  
    addEdge(vertex1, vertex2, weight) {
      this.adjList.get(vertex1).push({ vertex: vertex2, weight });
    }
  
    dijkstra(startVertex) {
      const distances = new Map();
      const previous = new Map();
      const pq = new PriorityQueue();
  
      // Встановлюємо початкові значення
      this.adjList.forEach((_, vertex) => {
        if (vertex === startVertex) {
          distances.set(vertex, 0);
          pq.enqueue(vertex, 0);
        } else {
          distances.set(vertex, Infinity);
        }
        previous.set(vertex, null);
      });
  
      // Алгоритм Дейкстри
      while (!pq.isEmpty()) {
        const { element: current } = pq.dequeue();
  
        this.adjList.get(current).forEach((neighbor) => {
          const newDist = distances.get(current) + neighbor.weight;
          if (newDist < distances.get(neighbor.vertex)) {
            distances.set(neighbor.vertex, newDist);
            previous.set(neighbor.vertex, current);
            pq.enqueue(neighbor.vertex, newDist);
          }
        });
      }
  
      return { distances, previous };
    }
  
    getShortestPath(startVertex, endVertex) {
      const { distances, previous } = this.dijkstra(startVertex);
      const path = [];
      let current = endVertex;
  
      while (current) {
        path.unshift(current);
        current = previous.get(current);
      }
  
      return {
        path,
        distance: distances.get(endVertex),
      };
    }
  }
  
  // Створення графа
  const graph = new Graph();
  graph.addVertex(1);
  graph.addVertex(2);
  graph.addVertex(3);
  graph.addVertex(4);
  graph.addVertex(5);
  graph.addVertex(6);
  
  graph.addEdge(1, 2, 5);
  graph.addEdge(2, 3, 5);
  graph.addEdge(3, 5, 6);
  graph.addEdge(5, 6, 4);
  graph.addEdge(6, 4, 7);
  graph.addEdge(1, 6, 1);
  graph.addEdge(2, 4, 3);
  graph.addEdge(4, 5, 3);
  
  // Знайдемо найкоротший шлях від ... до ...
  const result = graph.getShortestPath(1, 5);
  
  console.log("Найкоротший шлях:", result.path.join(" -> "));
  console.log("Відстань:", result.distance);
  