class Graph {
    constructor() {
        this.vertices = [];
        this.edges = [];
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
    }

    addEdge(vertex1, vertex2, weight) {
        this.edges.push({ vertex1, vertex2, weight });
    }
}

function prim(graph) {
    const MST = new Graph();
    const visited = new Set();
    
    // Додаємо перший вузол до Мінімального Остовного Дерева (MST)
    visited.add(graph.vertices[0]);
    
    while (visited.size < graph.vertices.length) {
        let minEdge = null;
        for (const edge of graph.edges) {
            if ((visited.has(edge.vertex1) && !visited.has(edge.vertex2)) ||
                (visited.has(edge.vertex2) && !visited.has(edge.vertex1))) {
                if (!minEdge || edge.weight < minEdge.weight) {
                    minEdge = edge;
                }
            }
        }
        
        MST.addEdge(minEdge.vertex1, minEdge.vertex2, minEdge.weight);
        visited.add(minEdge.vertex1);
        visited.add(minEdge.vertex2);
    }
    
    return MST;
}

// Створення графа
const graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addEdge(1, 2, 10);
graph.addEdge(2, 3, 19);
graph.addEdge(3, 4, 15);
graph.addEdge(4, 2, 20);

// Виконання алгоритму Прима
const MST = prim(graph);

console.log("Мінімальне остовне дерево (MST):", MST);
