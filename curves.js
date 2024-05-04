

function startDrag(e, id) {
    e.preventDefault();



    const windowElement = document.getElementById(id);
    const offsetX = e.clientX - windowElement.getBoundingClientRect().left;
    const offsetY = e.clientY - windowElement.getBoundingClientRect().top;

    function dragMove(e) {
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // Ensure the window stays within the viewport bounds
      x = Math.max(0, Math.min(window.innerWidth - windowElement.clientWidth, x));
      y = Math.max(0, Math.min(window.innerHeight - windowElement.clientHeight, y));

      windowElement.style.left = `${x}px`;
      windowElement.style.top = `${y}px`;
    }

    function dragEnd() {
      document.removeEventListener('mousemove', dragMove);
      document.removeEventListener('mouseup', dragEnd);
    }

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);

    // Bring the window to the front when dragging starts
    bringToFront(id);
}

function bringToFront(id) {
    const windowElement = document.getElementById(id);
    const windows = document.querySelectorAll('.window');
    let maxZIndex = 0;

    // Find the maximum z-index among all windows
    windows.forEach((win) => {
      const zIndex = parseInt(window.getComputedStyle(win).zIndex, 10);
      maxZIndex = Math.max(maxZIndex, zIndex);
    });

    // Set a higher z-index for the clicked window
    windowElement.style.zIndex = maxZIndex + 1;
}

function updateCirclePosition(id) {
    const dot1 = document.getElementById('dot1');
    const dot2 = document.getElementById('dot2');
    const dot3 = document.getElementById('dot3');
    const circle = document.getElementById('circle1');

    const rect = dot1.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const center1 = [centerX, centerY];

    const rect2 = dot2.getBoundingClientRect();
    const centerX2 = rect2.left + rect2.width / 2;
    const centerY2 = rect2.top + rect2.height / 2;
    const center2 = [centerX2, centerY2];

    const rect3 = dot3.getBoundingClientRect();
    const centerX3 = rect3.left + rect3.width / 2;
    const centerY3 = rect3.top + rect3.height / 2;
    const center3 = [centerX3, centerY3];
    
    console.log(center1, center2, center3)

    circumcenter = findCircumCenter(center1, center2, center3);

    r = Math.sqrt(Math.pow(circumcenter[0] - center1[0], 2) + Math.pow(circumcenter[1] - center1[1], 2));

    console.log(r)

    circle.style.left = `${circumcenter[0] - r}px`;
    circle.style.top = `${circumcenter[1] - r}px`;
    circle.style.width = `${2 * r}px`;
    circle.style.height = `${2 * r}px`;
}




// JavaScript program to find the CIRCUMCENTER of a
// triangle
 
// This pair is used to store the X and Y
// coordinate of a point respectively
// #define pdd pair<double, double>
 
// Function to find the line given two points
function lineFromPoints(P, Q)
{
    let a = Q[1] - P[1];
    let b = P[0] - Q[0];
    let c = a*(P[0])+ b*(P[1]);
    return [a, b, c];
}
 
// Function which converts the input line to its
// perpendicular bisector. It also inputs the points
// whose mid-point lies on the bisector
function perpendicularBisectorFromLine(P, Q, a, b, c)
{
    let mid_point = [(P[0] + Q[0])/2, (P[1] + Q[1])/2];
 
    // c = -bx + ay
    c = -b*(mid_point[0]) + a*(mid_point[1]);
 
    let temp = a;
    a = -b;
    b = temp;
    return [a, b, c];
}
 
// Returns the intersection point of two lines
function lineLineIntersection(a1, b1, c1, a2, b2, c2)
{
    let determinant = a1*b2 - a2*b1;
    if (determinant == 0)
    {
        // The lines are parallel. This is simplified
        // by returning a pair of FLT_MAX
        return  [(10.0)**19, (10.0)**19];
    }
 
    else
    {
        let x = (b2*c1 - b1*c2)/determinant;
        let y = (a1*c2 - a2*c1)/determinant;
        return [x, y];
    }
}
 
function findCircumCenter(P, Q, R)
{
    // Line PQ is represented as ax + by = c
    let PQ_line = lineFromPoints(P, Q);
    let a = PQ_line[0];
    let b = PQ_line[1];
    let c = PQ_line[2];
    
    // Line QR is represented as ex + fy = g
    let QR_line = lineFromPoints(Q, R);
    let e = QR_line[0];
    let f = QR_line[1];
    let g = QR_line[2];
     
    // Converting lines PQ and QR to perpendicular
    // vbisectors. After this, L = ax + by = c
    // M = ex + fy = g
    let PQ_perpendicular = perpendicularBisectorFromLine(P, Q, a, b, c);
    a = PQ_perpendicular[0];
    b = PQ_perpendicular[1];
    c = PQ_perpendicular[2];
     
    let QR_perpendicular = perpendicularBisectorFromLine(Q, R, e, f, g);
    e = QR_perpendicular[0];
    f = QR_perpendicular[1];
    g = QR_perpendicular[2];
     
    // The point of intersection of L and M gives
    // the circumcenter
    let circumcenter = lineLineIntersection(a, b, c, e, f, g);
 
    if (circumcenter[0] == (10.0)**19 && circumcenter[1] == (10.0)**19){
        console.log("The two perpendicular bisectors found come parallel" )
        console.log("Thus, the given points do not form a triangle and are collinear");
    }
    else{
        console.log("The circumcenter of the triangle PQR is: (", circumcenter[0], ",", circumcenter[1], ")");
    }

    return circumcenter;
}