
console.log(totalUsers , totalOrders , totalproducts , totalsales)

        new Chart(document.getElementById("orderChart"), {
            type: "doughnut",
            data: {
                labels: ["Users", "Orders", "products", "sales"],
                datasets: [{
                    data: [totalUsers ,totalOrders ,totalproducts ,totalsales ],
                    backgroundColor: [
                        "#FFC107",
                        "#2196F3",
                        "#4CAF50",
                        "#F44336"
                    ],
                    borderColor: "#fff",
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                cutout: "55%",
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        let D_alldata1 = null;
        
        function Udatas(button){
            if (D_alldata1) {
        D_alldata1.classList.remove("active");
    }
            const details = button.closest(".allU");
            D_alldata1 = details.querySelector(".D_alldata1");
            D_alldata1.classList.add("active");
        }

        function Udataoff(button){
            const details = button.closest(".allU");
            D_alldata1 = details.querySelector(".D_alldata1");
            D_alldata1.classList.remove("active");

            D_alldata1 = null;
        }
