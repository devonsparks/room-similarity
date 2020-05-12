The basic flow:

- First we implement a basic DiGraph structure.
- Then we implement a generic DFS traversal class. Knowing we'll need to use it for both postorder traversal and connected components, we opt to generalize this class so subclasses can override pre- and pre- visitation operations.
- Next we implement two subclasses to DFS. The first computes a postorder traversal on a default lexographic sort of the vertices. The second implements  Ksaraju-Sharir's connected components, using the result of a postorder traversal to initiate the sweep.
- Next, we use a brute force algorithm to compute hausdorff distances between all pairs within each connected components. This requires we implement both hausdorff and pairwise.
