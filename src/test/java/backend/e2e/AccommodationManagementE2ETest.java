package backend.e2e;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Klasa za End-to-End testiranje funkcionalnosti upravljanja smeštajem,
 * uključujući prijavu korisnika (HOST) i definisanje specijalnih cena.
 */
public class AccommodationManagementE2ETest {

    private static WebDriver driver;
    private static WebDriverWait wait;
    private static final String BASE_URL = "http://localhost:4200";
    private static final int TIMEOUT_SECONDS = 10;

    // --- Korisničke Informacije (HOST) ---
    // PAŽNJA: Zamenite sa ispravnim podacima HOST korisnika!
    private static final String HOST_EMAIL = "host@example.com";
    private static final String HOST_PASSWORD = "Password123";

    @BeforeAll
    public static void setup() {
        // Konfiguracija Chrome opcija za suzbijanje CDP upozorenja
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        // Opcija za ignorisanje upozorenja o neusklađenosti CDP verzije
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-logging", "ignoreCdpInfo"});

        // Postavljanje i inicijalizacija WebDriver-a
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();

        // Inicijalizacija WebDriverWait objekta za implicitno čekanje elemenata
        wait = new WebDriverWait(driver, Duration.ofSeconds(TIMEOUT_SECONDS));
    }

    @AfterAll
    public static void teardown() {
        // Zatvaranje pregledača nakon završetka svih testova
        if (driver != null) {
            driver.quit();
        }
    }

    /**
     * Prijavljuje HOST korisnika na aplikaciju.
     * @param email Email korisnika.
     * @param password Lozinka korisnika.
     */
    private void performLogin(String email, String password) {
        System.out.println("Pokušaj prijave HOST korisnika...");
        driver.get(BASE_URL + "/login");

        // --- KRITIČNA KOREKCIJA ---
        // Ispravka ID-ja za email polje. U HTML-u je definisan kao 'email', ne 'email-input'.
        // Koristimo visibilityOfElementLocated radi veće robustnosti.
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email"))).sendKeys(email);

        // Traženje i popunjavanje polja za lozinku
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("password"))).sendKeys(password);

        // Traženje i klik na dugme "Login"
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        // Provera uspešne prijave (pretpostavljamo da korisnik biva preusmeren na /profile)
        wait.until(ExpectedConditions.urlContains("/profile"));
        System.out.println("HOST prijava uspešna. Trenutni URL: " + driver.getCurrentUrl());
    }

    @Test
    public void testDefineSpecialPriceHappyPath() {
        // 1. Prijavljivanje HOST korisnika
        performLogin(HOST_EMAIL, HOST_PASSWORD);

        // --- 2. Implementacija logike testiranja ---
        // Ovde ide logika koja simulira akcije korisnika nakon prijave:

        // Primer: Navigacija do stranice za upravljanje smeštajem
        // wait.until(ExpectedConditions.elementToBeClickable(By.id("manage-accommodations-link"))).click();

        // Primer: Klik na dugme za definisanje specijalne cene
        // wait.until(ExpectedConditions.elementToBeClickable(By.id("special-price-btn-123"))).click();

        // ... (popunjavanje datuma, unosa cene, potvrda)

        // Asertacija: Proverite da li je operacija bila uspešna.
        // Npr., da li se pojavila poruka o uspehu
        // assertTrue(driver.findElement(By.id("success-message")).isDisplayed(), "Specijalna cena nije uspešno definisana.");

        // Privremena asertacija (dok se test ne napiše do kraja)
        assertTrue(driver.getCurrentUrl().contains("/profile"), "Nismo na stranici profila nakon prijave.");

        // OBAVEZNO: Dodajte detaljnu logiku za testiranje definisanja specijalne cene ovde.
    }

    // Dodajte po potrebi ostale test metode
}
