
#include <iostream>
#include <iomanip>
#include <vector>
#include <bitset>
#include <cstring>
#include <cstdint>  // Ensure this header is included for uint32_t and uint64_t
#include <fstream>

// Constants for SHA-256
const uint32_t H[] = {
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
};

const uint32_t K[] = {
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    // Continue filling the K values
};

// Right rotate function
uint32_t right_rotate(uint32_t value, uint32_t n) {
    return (value >> n) | (value << (32 - n));
}

// Function to pad the message to be a multiple of 512 bits
std::vector<std::string> pad_message(const std::string& message) {
    std::vector<std::string> blocks;
    std::string binary_message = "";
    
    // Convert each character to its binary equivalent (8 bits)
    for (char c : message) {
        binary_message += std::bitset<8>(c).to_string();
    }
    
    // Append a 1-bit followed by enough 0-bits
    binary_message += "1";
    while (binary_message.size() % 512 != 448) {
        binary_message += "0";
    }
    
    // Append the original message length (in bits) as a 64-bit value
    uint64_t length = binary_message.size() / 8;
    binary_message += std::bitset<64>(length).to_string();
    
    // Break the message into 512-bit blocks
    for (size_t i = 0; i < binary_message.size(); i += 512) {
        blocks.push_back(binary_message.substr(i, 512));
    }
    
    return blocks;
}

// SHA-256 function
std::string hashing(const std::string& message) {
    // Initialize hash values
    uint32_t H_values[] = {
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    };
    
    std::vector<std::string> blocks = pad_message(message);
    
    // Process each 512-bit block
    for (const std::string& block : blocks) {
        std::vector<uint32_t> schedule(64);
        
        // Break block into 32-bit words
        for (size_t i = 0; i < 16; ++i) {
            schedule[i] = std::bitset<32>(block.substr(i * 32, 32)).to_ulong();
        }
        
        // Extend the schedule to 64 words
        for (size_t i = 16; i < 64; ++i) {
            uint32_t s0 = right_rotate(schedule[i - 15], 7) ^ right_rotate(schedule[i - 15], 18) ^ (schedule[i - 15] >> 3);
            uint32_t s1 = right_rotate(schedule[i - 2], 17) ^ right_rotate(schedule[i - 2], 19) ^ (schedule[i - 2] >> 10);
            schedule[i] = schedule[i - 16] + s0 + schedule[i - 7] + s1;
        }
        
        uint32_t a = H_values[0], b = H_values[1], c = H_values[2], d = H_values[3], e = H_values[4], f = H_values[5], g = H_values[6], h = H_values[7];
        
        // Main loop
        for (size_t i = 0; i < 64; ++i) {
            uint32_t S1 = right_rotate(e, 6) ^ right_rotate(e, 11) ^ right_rotate(e, 25);
            uint32_t ch = (e & f) ^ ((~e) & g);
            uint32_t temp1 = h + S1 + ch + K[i] + schedule[i];
            uint32_t S0 = right_rotate(a, 2) ^ right_rotate(a, 13) ^ right_rotate(a, 22);
            uint32_t maj = (a & b) ^ (a & c) ^ (b & c);
            uint32_t temp2 = S0 + maj;
            
            h = g;
            g = f;
            f = e;
            e = d + temp1;
            d = c;
            c = b;
            b = a;
            a = temp1 + temp2;
        }
        
        H_values[0] += a;
        H_values[1] += b;
        H_values[2] += c;
        H_values[3] += d;
        H_values[4] += e;
        H_values[5] += f;
        H_values[6] += g;
        H_values[7] += h;
    }
    
    // Output the final hash value
    std::stringstream ss;
    for (size_t i = 0; i < 8; ++i) {
        ss << std::hex << std::setw(8) << std::setfill('0') << H_values[i];
    }
    return ss.str();
}



