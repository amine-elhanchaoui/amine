#include <iostream>
#include <vector>
#include <string>
#include "hash.cpp"
#include <fstream>
#include <algorithm>
using namespace std;

class Person{
    protected:
        string name;
        string address;
        string phone;
    public:
        Person(string p_name,string p_addr,string p_phone){
            name=p_name;
            address=p_addr;
            phone=p_phone;
        }
        // Setters
        void SetName(string N) {
            name=N;
        }
        void SetPhone(string Num) {
            phone=Num;
        }
        void SetAddr(string addr) {
            address=addr;
        }
        //Getters
        string getName() {
            return name ;
        }
        string getPhone() {
            return phone ;
        }
        string getAddress() {
            return address ;
        }
};
// class Manager{
//     private:
//         string manager_name;


// };
class Customer: public Person{
    protected:
        string customer_id;
    public:
        // Constructor with arguments (using base class constructor)"inheritance of constructor"
        Customer(string C_name,string C_phone,string C_address,string C_id):Person(name,phone,address){
            customer_id=C_id;
            name=C_name;
            phone=C_phone;
            address=C_address;
        };
        string GetCustomer_Id(){
            return customer_id;
        }
        string GetCustomerName(){
            return name;
        }
        string GetCustomerPhone(){
            return phone;
        }
        string GetCustomerAddr(){
            return address;
        }
        void SetCustomerAddr(string C_addr){
            address=C_addr;
        }
};
class Employee: public Person{
    private:
        string employee_id;
        int salary;
        string position;
        //the number of employees
        vector <Employee>employees;
    public:
        // Constructor with arguments (using base class constructor)"inheritance of constructor"
        Employee(string E_name,string E_phone,string E_address,string E_id,int E_salary,string E_position):Person(name,phone,address){
            employee_id=E_id;
            salary=E_salary;
            position=E_position;   
        }
        void AddEmployee(const Employee& employe){
            employees.push_back(employe);
        }
        string GetEmployee_Num(){
            return employee_id;
        }
        void SetEmployee_Num(string New_E_Id){
            employee_id=New_E_Id;
        }
        string GetEmployee_Position(){
            return position;
        }
        void SetEmployee_Position(string E_position){
            position=E_position;
        }
        int GetSalary(){
            return salary;
        }
        void SetSalary(int s){
            salary=s;
        }
};

class Bank{
    protected:
        string name;
        string addresse;
        string code;
    public:
         Bank( string B_name,string B_addr,string B_code){
            name=B_name;
            addresse=B_addr;
            code=B_code;
        }
        string GetBankName(){
            return name;
        }
        string GetBankAddr(){
            return addresse;
        }
        string GetBankCode(){
            return code;
        }

};
class Branch{
    protected:
        string branch_id;
        string name;
        string addresse;
        vector <Branch> branches;
    public:
        Branch(string Br_id,string Br_name,string Br_addr){
            branch_id=Br_id;
            name=Br_name;
            addresse=Br_addr;
        }
        string GetBranchId(){
            return branch_id;
        }
        string GetBranchName(){
            return name;
        }
        string GetBranchAddr(){
            return addresse;
        }
        void addBranch(const Branch& branch) {
            branches.push_back(branch);
        }
};

class Account: public Customer{
    private:
        int account_num;
        string account_password;
    public:
        Account(string C_name,string C_phone,string C_address,string C_id,int acc_num,string acc_pass ):Customer(C_name,C_phone,C_address,C_id){

        }
        string GetPassword(){
            return account_password;
        }
        void SetPass(string pass){
            account_password=pass;
        }
        void hash(string password){
            string hash = hashing(password);
            ofstream outFile("C:\\Users\\a\\OneDrive\\Bureau\\Projects\\small_projects\\hash.txt");
                if (outFile.is_open()) {
                    outFile << "Hash: " << hash << "\n";
                    outFile.close();
                } else {
                    cerr << "Unable to open file for writing!" << endl;
                }    
        }
};

int main(){
    cout <<"        Bank Management Systeme         " << endl;
    cout <<"You Are A..."<<endl;
    cout <<"1----Manager-----"<<endl;
    cout <<"2----Employee----"<<endl;
    cout <<"3----Customer----"<<endl;
    string choice;
    cout << "Enter Your Choice: ";
    cin >> choice;
    transform(choice.begin(), choice.end(), choice.begin(), ::tolower);
    if(choice=="manager"){
        cout<<"ba9i masawbthax";
    }
    if(choice=="employee"){
        cout<<"tal ghada";
    }
    if(choice=="customer"){
        cout<<"nfs xi";
    }
}


