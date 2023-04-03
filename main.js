class Vacxin {
    constructor(name, preven_vx, price_vc, describe, category) {

        this.name = name;              //Tên Vắc xin
        this.preven_vx = preven_vx;    //Nguồn gốc: 
        this.price_vc = price_vc;      // Giá Vc
        this.describe = describe;      // Công dụng 
        this.category = category;      // Danh mục
    }

}



let vacxinList = [
    new Vacxin('VẮC XIN CÚM INFLUVAC TETRA 0.5ML',
        'Nguồn gốc: Abbott (Hà Lan)', 299000, 'Cúm','Vắc xin cho trẻ em'),
    new Vacxin('VẮC XIN GCFLU QUADRIVALENT',
        'Nguồn gốc: Cúm', 345000, 'Cúm','Vắc xin cho trẻ em'),
    new Vacxin('VẮC XIN IVACFLU-S 0,5ML (VIỆT NAM) PHÒNG BỆNH CÚM',
        'Nguồn gốc: IVAC (Việt Nam)', 190000, 'Cúm (người lớn > 18 tuổi)','Vắc xin cho trẻ em tiền học đường'),
    new Vacxin('VẮC XIN PHÒNG DẠI VERORAB',
        'Nguồn gốc: Sanofi Pasteur (Pháp)', 323000, 'Dại','Vắc xin cho trẻ em tiền học đường'),
    new Vacxin('VẮC XIN ABHAYRAB 0.5ML (ẤN ĐỘ) PHÒNG BỆNH DẠI (TTD)',
        'Nguồn gốc: Human Biologicals Institute (Ấn Độ)', 215000, 'Dại','Vắc xin cho tuổi vị thành niên và thanh niên'),
    new Vacxin('VẮC XIN ABHAYRAB 0.5ML (ẤN ĐỘ) PHÒNG BỆNH DẠI (TB)',
        'Nguồn gốc: Human Biologicals Institute (Ấn Độ)', 255000, 'Dại','Vắc xin cho tuổi vị thành niên và thanh niên'),
    new Vacxin('VẮC XIN PHÒNG TIÊU CHẢY DO ROTA VIRUS - ROTATEQ',
        'Nguồn gốc: MSD (Mỹ)', 665000, 'Tiêu chảy cấp do Rotavirus','Vắc xin cho người trưởng thành'),
    new Vacxin('VẮC XIN ROTAVIN M1 (VIỆT NAM) PHÒNG TIÊU CHẢY CẤP DO ROTA VIRUS',
        'Nguồn gốc: Polyvac (Việt Nam)', 490000, 'Tiêu chảy cấp do Rotavirus','Vắc xin cho người trưởng thành'),
    new Vacxin('VẮC XIN VIÊM GAN A+B TWINRIX',
        'Nguồn gốc: GSK (Bỉ)', 560000, 'Viêm gan A, Viêm gan B','Vắc xin cho phụ nữ chuẩn bị trước mang thai'),
];

function renderVx() {
    let row = document.querySelector('.row');
    for (let vacxin of vacxinList) {
        let index = vacxinList.indexOf(vacxin);
        console.log(index);
        row.innerHTML += `<div value="${vacxin.category}"class="vacxin_item">
        <div class="vacxin_item-label">
            <div class="vacxin_item_bg">
                <img src="assets/img/Vaccine_Item.png" alt="">
                <div class="vacxin_item_info">
                    <p class="vacxin_name">${vacxin.name}</p>
                    <p class="vacxin_prevention">${vacxin.preven_vx}</p>
                    <div class="vacxin-tag-price">

                        <span>${formatCurrency(vacxin.price_vc)}</span>

                    </div>
                    <h5>Phòng bệnh :</h5>
                    <div class="describe">
                        ${vacxin.describe}
                    </div>
                    <button id="btn${index}" class="btn">CHỌN</button>
                </div>
            </div>
        </div>
    </div>`
    }
}

function formatCurrency(number) {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
renderVx();



// Xử lý button chọn và đã chọn
const btns = document.querySelectorAll(".btn");
let oder = document.querySelector('.vacxin-oder');
let total_pay = 0;
btns.forEach((btn, index) => {

    btn.addEventListener("click", function () {
        if (btn.classList.contains("selected")) {
            btn.innerText = 'CHỌN';
            btn.classList.remove("selected");
            // Giảm bớt chiều cao và xóa oder khi bấm nút đã chọn
            let element = document.getElementById(`oder${index}`);
            let css_oder = getComputedStyle(element);
            let heightElement = parseInt(css_oder.height);
            cut_Height_divChoose(heightElement);
            element.parentNode.removeChild(element);

            // Khi xóa 1 oder thì tổng tiền giảm theo
            total_pay -= vacxinList[index].price_vc;
            document.getElementById('pay-money').innerText = formatCurrency(total_pay);

        } else {
            btn.innerText = "ĐÃ CHỌN";
            btn.classList.add("selected");
            oder.innerHTML += `<div class="vacxin-oder-item" id="oder${index}">
                            <div class="vacxin_item_oder-info">
                                <p class="vacxin_oder_name">${vacxinList[index].name}
                                <i class="ti-close" id="close${index}"></i>
                                </p>
                                <h5>Phòng bệnh :
                                    <div class="vacxin_oder_describe">
                                    ${vacxinList[index].describe}
                                    </div>
                                </h5>
                                <p class="vacxin_oder_prevention">${vacxinList[index].preven_vx}</p>
                                <div class="vacxin-oder-tag-price">

                                    <span>${formatCurrency(vacxinList[index].price_vc)}</span>

                                </div>
                            </div>
                            <hr style="border-top: dotted 1px;" />
                        </div>`;
            // Thêm oder và tăng chiều cao thẻ choose
            let element1 = document.getElementById(`oder${index}`);
            let css_oder = getComputedStyle(element1);
            let heightElement = parseInt(css_oder.height);
            plus_Height_divChoose(heightElement);

            // Tính tổng tiền thanh toán
            total_pay += vacxinList[index].price_vc;
             document.getElementById('pay-money').innerText = formatCurrency(total_pay);

        }
    });
});
// Xử lý sự kiện click vào nút CLOSE X
oder.addEventListener('click', function (event) {
    if (event.target.matches('.ti-close')) {
        const item = event.target.closest('.vacxin-oder-item');
        item.parentNode.removeChild(item);
        // Lấy giá trị index của id close và chọn nút button tương ứng
        const index = event.target.getAttribute('id').replace('close', '');
        const btn = document.getElementById(`btn${index}`);
        btn.innerText = "CHỌN";
        btn.classList.remove("selected");

        // Khi xóa 1 oder thì tổng tiền giảm theo
        cut_Height_divChoose(160);
        total_pay -= vacxinList[index].price_vc;
        document.getElementById('pay-money').innerText = formatCurrency(total_pay);
    }
});

// Hàm xử lý khi thêm hoặc xóa oder thì tăng giảm kích thước ô hiển thị
function plus_Height_divChoose(value) {
    let c = document.getElementById('vxchoose');
    let css = getComputedStyle(c);
    vxchoose.style.height = parseInt(css.height) + value + 20 + 'px';
};

function cut_Height_divChoose(value) {
    let c = document.getElementById('vxchoose');
    let css = getComputedStyle(c);
    vxchoose.style.height = parseInt(css.height) - value -20 + 'px';
};

// Xử lý sự kiện click dropdown và hiển thị ra danh sách vắc xin từng nhóm
function showCatelogy(element) {
    const selectedCategory = element.getAttribute('value');
    const vacxinListItems = document.querySelectorAll('.vacxin_item');
    document.getElementById('info-vx').innerText = selectedCategory;
    vacxinListItems.forEach(function(vacxin) {
      if (vacxin.getAttribute('value') === selectedCategory) {
        vacxin.style.display = 'block';
      } else {
        vacxin.style.display = 'none';
      }
    });
  }

// Xử lý ô tìm kiếm nhập tên vắc xin cần tìm và hiển thị 
function searchItemVx() {
    const inputSearch = document.getElementById('search').value.toLowerCase();
    // console.log(inputSearch);
    const vacxinListItems = document.querySelectorAll('.vacxin_item');
    
    vacxinListItems.forEach(function(vacxin) {
        vacxinName = vacxin.querySelector('.vacxin_name').textContent.toLowerCase();
        
        if ( vacxinName.includes(inputSearch) ) {
            vacxin.style.display = 'block';
        } else {
            vacxin.style.display = 'none';
        }
    })
}

// Xử lý nút Quản lý Vắc xin

const btnvx = document.querySelector('.btnvx');
const model = document.querySelector('.model');
const containermd = document.querySelector('.container-md');
const home = document.querySelector('.ti-home');

btnvx.addEventListener('click', function() {
    model.classList.add('open')
});

model.addEventListener('click', function() {
    model.classList.remove('open');
})
home.addEventListener('click', function() {
    model.classList.remove('open');
})

containermd.addEventListener('click', function(event) {
    event.stopPropagation();
})

// Hiển thị danh mục quản lý Vx

function renderVx_Manager() {
    let tbVendor = document.querySelector('#tbVendor');
    console.log(tbVendor);
    for (let vacxin of vacxinList) {
        tbVendor.innerHTML += `
            <tr>
                <td>${vacxin.category}</td>
                <td>${vacxin.name}</td>
                <td class="text-right">${vacxin.preven_vx}</td>
                <td class="text-right">${formatCurrency(vacxin.price_vc)}</td>
                <td class="text-right">${vacxin.describe}</td>
                <td class="text-center">
                    <button class="btn-danger" onclick="removeVendor()">Delete</button>
                    <button class="btn-dark" onclick="editVendor()" >Edit</button>
                </td>
            </tr>
        `; 
    }
}
renderVx_Manager();
  
