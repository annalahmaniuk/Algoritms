class Graph {
    constructor() {
      this.adjList = new Map();
    }
  
    addVertex(vertex) {
      if (!this.adjList.has(vertex)) {
        this.adjList.set(vertex, []);
      }
    }
  
    addEdge(vertex1, vertex2) {
      this.adjList.get(vertex1).push(vertex2);
    }
  
    *bfsStepByStep(startVertex) {
      const visited = new Set();
      const queue = [startVertex];
      visited.add(startVertex);
  
      while (queue.length > 0) {
        const current = queue.shift();
  
        // Видаємо поточний вузол, чергу, і відвідані вузли
        yield {
          current,
          queue: [...queue],
          visited: new Set(visited),
        };
  
        const neighbors = this.adjList.get(current);
  
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
    }
  }
  
  // Створюємо граф і додаємо вершини
  const graph = new Graph();
  graph.addVertex(0);
  graph.addVertex(1);
  graph.addVertex(2);
  graph.addVertex(3);
  graph.addVertex(4);
  graph.addVertex(5);
  graph.addVertex(6);
  graph.addVertex(7);
  
  // Додаємо ребра відповідно до опису графа
  graph.addEdge(0, 1);
  graph.addEdge(0, 3);
  graph.addEdge(0, 4);
  graph.addEdge(1, 2);
  graph.addEdge(1, 5);
  graph.addEdge(2, 6);
  graph.addEdge(4, 7);
  
  // BFS покроково, починаючи з 0
  const bfsGenerator = graph.bfsStepByStep(0);
  
  // Ітеруємо крок за кроком
  let step = bfsGenerator.next();
  while (!step.done) {
    console.log("Поточний вузол:", step.value.current);
    console.log("Черга:", step.value.queue);
    console.log("Відвідані вузли:", [...step.value.visited]);
    console.log("----");
  
    step = bfsGenerator.next(); // наступний крок
  }
  
  console.log("Пошук завершено.");
  