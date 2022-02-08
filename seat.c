#include <stdio.h>

int main(){
    int n; // jumlah seat
    scanf("%d",&n);
    
    n -= 2; // coba buang 2 seat di paling belakang yg posisinya beda sendiri
    int ans;
    for(int i = 1 ; i*i <= n ; i++){
        if(n % i == 0){
            ans = i;
        }
    }
    // cari yang terbaik
    int width, length;
    
    if(ans < n/ans){
        width = n/ans;
        length = ans;   
    }else{
        width = ans;
        length = n/ans;
    }
    
    // printf("lebar: %d\n", width);
    // printf("panjang ke belakang: %d\n", length);
    
    //printf("\n");
    for(int i=0;i<length;i++){
        for(int j=0;j<width;j++){
            if(i!=length-1 && (j==2 || j==width-3)) printf(" ");
            else printf("*");
        }
        printf("\n");
    }
    
    return 0;
}