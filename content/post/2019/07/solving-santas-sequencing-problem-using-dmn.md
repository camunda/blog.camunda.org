+++
author = "Rob Parker, Enterprise Architect,  Australia Post"
categories = ["Community"]
tags = ["CamundaCon", "DMN"]
date = "2019-07-14T0:00:00+01:00"
title = "Solving Santa’s Sequencing Problem Using Domain Narrowing Constraint Propagation Based on DMN collect hit policies."
+++

[CamundaCon 2019](https://www.camundacon.com) is just around the corner! Rob Parker, Enterprise Architect at Australia Post, will be presenting Innovative Problems For Elegant Solutions and he’s shared with us a sneak peak at the kind of out-of-the-box thinking his presentation will cover:

Everybody is likely familiar with Sudoku puzzles. When I solve them, I typically use little pencil marks to track which values are still feasible in unresolved cells. In other words, for each unresolved cell, I annotate it with the set of remaining possible values or its domain. As each cell is solved, the implication is propagated to its neighbouring cells by crossing off the infeasible values (domain narrowing) from each set of candidate values.  This technique is effectively a form of constraint propagation with domain narrowing.

<!--more-->
{{< figure src="image1.png" alt="Figure 1 – Sudoku pencil marks (Image courtesy learn-sudoku.com)">}}
<b><i>Figure 1 – Sudoku pencil marks (Image courtesy learn-sudoku.com)</i></b>

I often wondered if I could use a DMN collect hit policy to achieve a similar effect of domain narrowing and constraint propagation.  The Decision Management Community occasionally publish puzzles to solve. One of the puzzles [1] they published some time back comprised a puzzle to solve the order of Santa’s reindeer. The problem is to assign a sleigh position to each of Santa’s reindeer according to the given constraints. Constraints include details such that certain reindeer must be behind other reindeer, certain reindeer can’t lead etc. This was a perfect puzzle for trying out my idea. My solution uses DMN tables with a collect hit policy in order to perform a domain narrowing search of the solution space to solve the reindeer ordering problem.

The solution approach comprises a driver process to perform the recursive search of possible solutions, and use of DMN tables to propagate constraints and effectively prune the search. The search space is greatly reduced via domain narrowing, as infeasible values are removed from the search prior to their elaboration. Infeasible solutions can be detected early and thus a requirement to backtrack can be determined before all variables are bound to a value if the domain of a free variable becomes empty.

The search algorithm considers each reindeer in turn. Each reindeer could potentially be in any position from 0 to 8 and this forms the reindeer’s solution domain. A value is selected from that reindeer’s domain and assigned as that reindeer’s position. If all the reindeer are assigned a position, and there are no conflicts, then the solution is found. Otherwise, propagate the implication of this assignment to the other reindeer domains which could result in some positions being pruned from some reindeer’s domains. Repeat until a solution is found, or if infeasible, eg a reindeer’s domain is narrowed to become empty, then backtrack. The search process effectively performs a tree search of the solution space. Infeasible branches of the tree can be pruned by the use of DMN tables to propagate constraints. The driver process for the recursive search is outlined in pseudo-code below;

Basic Search Algorithm:

```
Let R be the set of reindeer r.
Let D be the set of valid positions d in reindeer r’s domain.
For each variable r in R {
	For each value d in reindeer r’s domain set D {
		Set value of r to d (r<-d) in current solution arrangement
		If solved, print solution
		else
		For each r’ in R where r’ != r {
			Apply implications of r<-d on r’ and thus domain narrow r’
			If  r’ domain is empty, then abort this branch of the search.
		}
		recurse		
	}
}
```
Thus given the assigned value of a particular reindeer, the feasible domains of all the other reindeer are determined by the decision tables. The decision table hit policy uses a collect policy such that the set of feasible position values is determined from the set of rules. The solution approach requires a decision table for each reindeer or variable.

As given in the problem statement, the constraints describe the relationship between two reindeer as either one of in front of, or behind the other. In this implementation, I have normalised all the given constraints such that they are all consistently centric one way, eg reindeer ‘A’ behind reindeer ‘B’. For example, consider Blitzen. An analysis of the constraints indicates that Dancer, Donder and Vixen must all be behind Blitzen. Thus, if Blitzen is assigned a position, this implication must be propagated to all other reindeer positions. For the variables representing Dancer, Donder and Vixen, the resulting domains must be the set of positions greater than Blitzen’s assigned position as they must be behind Blitzen according to the problem constraints. For any other reindeer’s position variable, the set of positions can be anything but that position assigned to Blitzen as there can only be a single reindeer in each position.

This is shown in the DMN table below.  Thus the inputs are the position assigned to Blitzen and the name of the target reindeer we are assessing the implication against. The collect hit policy in conjunction with the structure of the rule set ensures that the set of valid positions according to the constraints and Blitzen’s assigned position is returned as a result set.

{{< figure src="image2.png" alt="Figure 1 - Sample decision table for Blitzen">}}
<b><i>Figure 2 - Sample decision table for Blitzen</i></b>

Consider if Blitzen was assigned position 6. Then the implication on Dancer is Dancer can only take on either position 7 or 8. This would be reflected in two rows firing in the decision table with the collect policy returning the set {7,8}. The implication for Dander would be eight rows firing. In other words, Dander could take on any position other than 6 and hence the collect hit policy would return the set {0,1,2,3,4,5,7,8}.
Hence as per the table above Dancer, Donder and Vixen must all be behind Blitzen. The order of other reindeer relative to Blitzen are unconstrained. Thus the structure of the decision table reflects these two groups. The top half of the table applies to the impacted subset of reindeer and ensures that Blitzen is in front of this restricted set. It may be tempting to think I could implement this with a single rule, eg ‘a’<’b’, however the enumeration of rules 1 to 9 is required because the outcome I need from the hit policy is the set of valid values. For those reindeer not impacted by Blitzen, they are catered for in the latter half of the table where the rules effectively propagate that a position can have one, and one only reindeer assigned. Beyond that, any other position is potentially valid.

Whilst the decision tables can accurately capture the problem constraints, they do not capture the current state of the search tree or partial problem solution. An additional function is required to determine the intersection of this feasible set of domain values and the target variable’s current domain set. Again consider the case of Blitzen assigned position 6 and lets assume Dancer’s domain has already been narrowed to the set {5,6,8}  by the assignment of positions to other reindeer’s variables. The intersection of Dancer’s current domain {5,6,8} and the result of the decision table {7,8} results in the set {8}. Thus in the current partial solution arrangement, assigning position 6 to Blitzen implies that Dancer must be assigned position 8. We may not yet know if this is a feasible solution arrangement, however we have significantly reduced the number of search combinations.
Hence the domain of a variable is narrowed until either it’s empty, indicating an infeasible state, or its value is fixed as part of the recursive search. The intersect function is realised by a single groovy script list function which returns the intersection of two lists. Hence the feasible set of values for each reindeer is the intersection of the reindeer’s current domain and the set of values from the decision table result.

Each reindeer has its own decision table which captures the implication of its position assignment on its potential neighbours. Hence as shown above, this particular decision table applies to Blitzen as the source variable and the implications on all other reindeer’s position variables.

Having constructed a decision table for each reindeer capturing the problem constraints, I was readily able to solve the problem. I also implemented a solution approach based on a brute force enumerated search of the entire search tree. In comparison, the DMN based constraint propagation approach was definitely faster as domain narrowing significantly reduces the search space. The outcome was I achieved my goal of satisfying myself that I could achieve a form of constraint propagation problem solving with DMN collect hit policies.

(If you found this a little obscure and yet interesting, don’t miss my presentation at CamundaCon 2019 - Innovative Problems for Elegant Solutions - where I will discuss a number of possibly obscure yet interesting process patterns)

\[1\] [https://dmcommunity.org/challenge/challenge-dec-2017/] (https://dmcommunity.org/challenge/challenge-dec-2017/)
